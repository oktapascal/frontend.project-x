import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const useAxiosInterceptor = () => {
  const navRef = useRef(useNavigate());

  const [cookieSession] = useCookies(["session-token"]);
  // const [cookieRefreshSession] = useCookies(["session-refresh-token"]);

  useEffect(() => {
    const interceptorRequest = axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (cookieSession["session-token"])
          config.headers[
            "Authorization"
          ] = `Bearer ${cookieSession["session-token"]}`;

        if (import.meta.env.DEV)
          console.info(`[request] [${JSON.stringify(config)}]`);

        return config;
      },
      (error: AxiosError): Promise<AxiosError> => {
        if (import.meta.env.DEV)
          console.error(`[request error] [${JSON.stringify(error)}]`);
        return Promise.reject(error);
      }
    );

    const interceptorResponse = axios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      (error: AxiosError) => {
        navRef.current("/login");

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptorRequest);
      axios.interceptors.response.eject(interceptorResponse);
    };
  }, [cookieSession]);
};

export default useAxiosInterceptor;
