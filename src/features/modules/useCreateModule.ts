import { useMutation } from "@tanstack/react-query";
import { FormInput } from "@/types/IModule";

export default function useCreateModule() {
  return useMutation({
    mutationFn: async (request: FormInput) => {
      console.log(request);
    },
  });
}
