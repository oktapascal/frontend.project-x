import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

interface ExtendInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry: boolean;
}

interface Response {
  access_token: string;
  refresh_token: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const instance = axios.create();

const useAxiosInterceptor = () => {
  const navRef = useRef(useNavigate());

  const [cookieSession, setSessionCookie] = useCookies(["session-token"]);
  const [cookieRefreshSession, setSessionRefreshCookie] = useCookies([
    "session-refresh-token",
  ]);

  useEffect(() => {
    const interceptorRequest = axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        console.log(cookieSession["session-token"]);

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
        if (import.meta.env.DEV)
          console.info(`[response] [${JSON.stringify(response)}]`);

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest =
          error.config as ExtendInternalAxiosRequestConfig;

        switch (error.response?.status) {
          case 401:
            if (!originalRequest._retry) {
              originalRequest._retry = true;

              if (cookieRefreshSession["session-refresh-token"]) {
                try {
                  const request = await axios.patch(
                    `${BASE_URL}/auth/refresh`,
                    {},
                    {
                      headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${cookieRefreshSession["session-refresh-token"]}`,
                      },
                    }
                  );

                  const response = request.data as Response;

                  const accessDate = new Date();
                  const refreshDate = new Date();

                  const minutes = 60 * 1000;
                  const oneDay = 60 * 60 * 24 * 1000;

                  const expiresAccess = accessDate.getTime() + minutes * 14.5;
                  const expiresRefresh = refreshDate.getTime() + oneDay * 7;

                  accessDate.setTime(expiresAccess);
                  refreshDate.setTime(expiresRefresh);

                  setSessionCookie("session-token", response.access_token, {
                    expires: accessDate,
                  });

                  setSessionRefreshCookie(
                    "session-refresh-token",
                    response.refresh_token,
                    {
                      expires: refreshDate,
                    }
                  );

                  originalRequest.headers[
                    "Authorization"
                  ] = `Bearer ${response.access_token}`;

                  return instance(originalRequest);
                } catch {
                  navRef.current("/login");
                }
              } else {
                navRef.current("/login");
              }
            }
            break;
          default:
            break;
        }

        if (import.meta.env.DEV)
          console.error(`[response error] [${JSON.stringify(error)}]`);

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptorRequest);
      axios.interceptors.response.eject(interceptorResponse);
    };
  }, [cookieSession, cookieRefreshSession]);
};

export default useAxiosInterceptor;
