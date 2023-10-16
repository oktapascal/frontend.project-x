import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { Cookies } from "react-cookie";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const cookies = new Cookies();

  if (cookies.get("session-token"))
    config.headers["Authorization"] = `Bearer ${cookies.get("session-token")}`;

  if (import.meta.env.DEV)
    console.info(`[request] [${JSON.stringify(config)}]`);

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  if (import.meta.env.DEV)
    console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (import.meta.env.DEV)
    console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (import.meta.env.DEV)
    console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}
