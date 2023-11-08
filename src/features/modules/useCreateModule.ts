import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { FormInput, FormResponse } from "@/interfaces/IModule";

export default function useCreateModule() {
  return useMutation({
    mutationFn: async (request: FormInput) => {
      const result = await axiosInstance.post(
        "/module/save",
        { ...request },
        { headers: { Accept: "application/json", "Content-Type": "application/json" }, withCredentials: true }
      );

      return result.data as FormResponse;
    },
  });
}
