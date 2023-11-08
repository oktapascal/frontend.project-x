import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { IModule } from "@/interfaces/IModule";

export default function useFetchModule(module_id: string) {
  return useQuery({
    queryKey: [`fetch.${module_id}.module`, module_id],
    queryFn: async () => {
      const result = await axiosInstance.get(`/module/show/${module_id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return result.data as IModule;
    },
  });
}
