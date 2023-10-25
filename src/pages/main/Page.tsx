import axios from "axios";
import { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ListModules, Loading } from "./components";
import { ModuleResponses } from "./types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchModules = async (): Promise<ModuleResponses[]> => {
  const result = await axios.get(`${BASE_URL}/module/user`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return result.data;
};

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["modules"],
    queryFn: () => fetchModules(),
  });

  useEffect(() => {
    document.title = "Project-X | Home";
  }, []);

  if (error) return <div>unknown error {error.message}</div>;

  return (
    <Container maxWidth="100%" paddingTop="1rem">
      {isLoading ? <Loading /> : <ListModules modules={data} />}
    </Container>
  );
}
