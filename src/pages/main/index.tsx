import { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import { ListModules, Loading } from "@/pages/main/components";
import { useFetchModules } from "@/features/moduleUser";

export default function Page() {
  const { data, isLoading, error } = useFetchModules();

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
