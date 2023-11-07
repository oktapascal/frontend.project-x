import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";

export default function useDeleteModule() {
  return useMutation({
    mutationFn: async (module_id: string) => {
      await axiosInstance.delete(`/module/delete/${module_id}`, {
        headers: {
          Accept: "application/json",
        },
      });
    },
  });
}
