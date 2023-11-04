import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { createStandaloneToast } from "@chakra-ui/react";
import { useUserStore, useModuleStore } from "@/stores";
import { fetchRequestToken } from "@/features/refresh";
import router from "@/router";

interface ExtendInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  "X-NO-RETRY": string;
}

const { toast } = createStandaloneToast();

const NO_RETRY_HEADER = "X-NO-RETRY";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (import.meta.env.DEV) console.info(`[request] [${JSON.stringify(config)}]`);

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (import.meta.env.DEV) console.error(`[request error] [${JSON.stringify(error)}]`);

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (import.meta.env.DEV) console.info(`[response] [${JSON.stringify(response)}]`);

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error?.config as ExtendInternalAxiosRequestConfig;

    if (error?.response?.status === 401 && !originalRequest.headers[NO_RETRY_HEADER]) {
      try {
        const { access_token } = await fetchRequestToken();

        originalRequest.headers[NO_RETRY_HEADER] = "true";
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

        return axiosInstance(originalRequest);
      } catch (_error) {
        useUserStore.getState().reset();
        useModuleStore.getState().reset();

        router.navigate("/login");

        toast({ title: "Your token was expired, please login again", status: "error", variant: "solid", position: "top" });

        return Promise.reject(_error);
      }
    }

    if (import.meta.env.DEV) console.error(`[response error] [${JSON.stringify(error)}]`);

    return Promise.reject(error);
  }
);

export default axiosInstance;
