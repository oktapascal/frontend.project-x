import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { IModule } from "@/types/IModule";

export default function useFetchModules() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetch.moduleMenus"],
    queryFn: async () => {
      const result = await axiosInstance.get("/module/all", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return result.data as IModule[];
    },
  });

  return { data, isLoading, error };
}
