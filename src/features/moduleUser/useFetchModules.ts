import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { IModulesUser } from "@/types/IModuleUser";

export default function useModules() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetch.usermodules"],
    queryFn: async () => {
      const result = await axiosInstance.get("/module/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return result.data as IModulesUser[];
    },
  });

  return { data, isLoading, error };
}
