import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ModuleResponses } from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function useModules() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["modules"],
    queryFn: async () => {
      const result = await axios.get(`${BASE_URL}/module/user`, {
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
