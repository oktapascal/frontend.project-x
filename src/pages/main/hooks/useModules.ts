import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { ModuleResponses } from "../types";

export default function useModules() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetch.modules"],
    queryFn: async () => {
      const result = await axiosInstance.get("/module/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return result.data as ModuleResponses[];
    },
  });

  return { data, isLoading, error };
}
