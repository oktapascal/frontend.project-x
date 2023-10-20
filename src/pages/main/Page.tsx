import axios from "axios";
import { FC, useEffect } from "react";
import { useDisclosure, Container } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Navbar, SignOutAlert, ListModules, Loading } from "./components";
import { ModuleResponses } from "./types";

import "./styles/styles.min.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchModules = async () => {
  const result = await axios.get(`${BASE_URL}/module/user`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return result.data as ModuleResponses[];
};

const Page: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["modules"],
    queryFn: fetchModules,
  });

  useEffect(() => {
    document.title = "Project-X | Home";
  }, []);

  if (error) return <div>unknown error {error.message}</div>;

  return (
    <>
      <div className="bg-main">
        <Navbar onToggleAlert={onOpen} />
        <Container maxWidth="100%" paddingTop="1rem">
          {isLoading ? <Loading /> : <ListModules modules={data} />}
        </Container>
      </div>

      <SignOutAlert isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Page;
