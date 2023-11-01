import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import { useToast } from "@chakra-ui/react";
import { useUserStore, useModuleStore } from "@/stores";
import { router } from "@/router";

interface ExtendInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry: boolean;
}

interface CredentialsResponse {
  access_token: string;
  refresh_token: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (cookies.get("session-token")) config.headers["Authorization"] = `Bearer ${cookies.get("session-token")}`;

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
    const originalRequest = error.config as ExtendInternalAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (cookies.get("session-refresh-token")) {
        try {
          const request = await axiosInstance.patch(
            "/auth/refresh",
            {},
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${cookies.get("session-refresh-token")}`,
              },
            }
          );

          const response = request.data as CredentialsResponse;

          cookies.set("session-token", response.access_token, {
            maxAge: 900, // 7 menit
          });

          cookies.set("session-refresh-token", response.refresh_token, {
            maxAge: 604800, // 7 hari
          });

          originalRequest.headers["Authorization"] = `Bearer ${response.access_token}`;

          return axiosInstance(originalRequest);
        } catch {
          useModuleStore().reset();
          useUserStore().reset();

          useToast({ title: "Your token was expired, please login again", status: "error", variant: "solid" });

          router.navigate("/login");
        }
      } else {
        useModuleStore().reset();
        useUserStore().reset();

        useToast({ title: "Your token was expired, please login again", status: "error", variant: "solid" });

        router.navigate("/login");
      }
    }

    if (import.meta.env.DEV) console.error(`[response error] [${JSON.stringify(error)}]`);

    return Promise.reject(error);
  }
);

export default axiosInstance;
