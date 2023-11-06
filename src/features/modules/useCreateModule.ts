import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { FormInput } from "@/types/IModule";

export default function useCreateModule() {
  const mutation = useMutation({
    mutationFn: async (request: FormInput) => {
      const result = await axiosInstance.post(
        "/module/save",
        { request },
        { headers: { Accept: "application/json", "Content-Type": "application/json" } }
      );

      return result.data;
    },
  });

  return { ...mutation };
}
