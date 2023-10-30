import { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useToast } from "@chakra-ui/react";
import { useModuleStore, useUserStore } from "@/stores";
import { axiosInstance } from "@/utils";
import { router } from "@/router";

interface ExtendInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry: boolean;
}

interface Response {
  access_token: string;
  refresh_token: string;
}

export default function useAxiosInterceptor() {
  const [cookieSession, setSessionCookie] = useCookies(["session-token"]);
  const [cookieRefreshSession, setSessionRefreshCookie] = useCookies(["session-refresh-token"]);

  const toastRef = useRef(useToast());

  const resetUser = useUserStore((state) => state.reset);
  const resetModule = useModuleStore((state) => state.reset);

  useEffect(() => {
    const interceptorRequest = axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        console.log(cookieSession["session-token"]);

        if (cookieSession["session-token"]) config.headers["Authorization"] = `Bearer ${cookieSession["session-token"]}`;

        if (import.meta.env.DEV) console.info(`[request] [${JSON.stringify(config)}]`);

        return config;
      },
      (error: AxiosError): Promise<AxiosError> => {
        if (import.meta.env.DEV) console.error(`[request error] [${JSON.stringify(error)}]`);

        return Promise.reject(error);
      }
    );

    const interceptorResponse = axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        if (import.meta.env.DEV) console.info(`[response] [${JSON.stringify(response)}]`);

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as ExtendInternalAxiosRequestConfig;

        switch (error.response?.status) {
          case 401:
            if (!originalRequest._retry) {
              originalRequest._retry = true;

              if (cookieRefreshSession["session-refresh-token"]) {
                try {
                  const request = await axiosInstance.patch(
                    "/auth/refresh",
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

                  setSessionRefreshCookie("session-refresh-token", response.refresh_token, {
                    expires: refreshDate,
                  });

                  originalRequest.headers["Authorization"] = `Bearer ${response.access_token}`;

                  return axiosInstance(originalRequest);
                } catch {
                  resetUser();
                  resetModule();

                  toastRef.current({
                    title: "Your token was expired, please login again",
                    status: "error",
                    variant: "solid",
                  });

                  router.navigate("/login");
                }
              } else {
                resetUser();
                resetModule();

                toastRef.current({
                  title: "Your token was expired, please login again",
                  status: "error",
                  variant: "solid",
                });

                router.navigate("/login");
              }
            }
            break;
          default:
            toastRef.current({
              title: "Unknown error, please contact admin",
              status: "error",
              variant: "solid",
            });
            break;
        }

        if (import.meta.env.DEV) console.error(`[response error] [${JSON.stringify(error)}]`);

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptorRequest);
      axiosInstance.interceptors.response.eject(interceptorResponse);
    };
  }, [cookieSession, cookieRefreshSession, resetModule, resetUser, setSessionCookie, setSessionRefreshCookie]);
}
