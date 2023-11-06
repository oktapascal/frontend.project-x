import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { IModulesUser } from "@/types/IModuleUser";

export default function useModules() {
  return useQuery({
    queryKey: ["fetch.usermodules"],
    queryFn: async () => {
      const result = await axiosInstance.get("/module/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return result.data as IModulesUser[];
    },
  });
}
