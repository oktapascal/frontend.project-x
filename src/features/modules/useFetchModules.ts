import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { IModule } from "@/types/IModule";

export default function useFetchModules() {
  return useQuery({
    queryKey: ["fetch.modules"],
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
}
