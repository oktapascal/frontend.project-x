import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { IMenu } from "@/types/IMenu";

export default function useFetchModuleMenus(module_id: string | null) {
  return useQuery({
    queryKey: ["fetch.menus", module_id],
    queryFn: async () => {
      const result = await axiosInstance.get(`/modules-menu/${module_id}`, {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        withCredentials: true,
      });

      return result.data as IMenu[];
    },
  });
}
