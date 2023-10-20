import { FC, useEffect } from "react";
import { useDisclosure, Container } from "@chakra-ui/react";
import { Navbar, SignOutAlert, ListModules } from "./components";

import "./styles/styles.min.css";

const Page: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    document.title = "Project-X | Main";
  }, []);

  return (
    <>
      <div className="bg-main">
        <Navbar onToggleAlert={onOpen} />
        <Container maxWidth="100%" paddingTop="1rem">
          <ListModules />
        </Container>
      </div>

      <SignOutAlert isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Page;
