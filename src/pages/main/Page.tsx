import { FC } from "react";
import { useDisclosure, Container } from "@chakra-ui/react";
import { Navbar, SignOutAlert } from "./components";

import "./styles/styles.min.css";

const Page: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="bg-main">
        <Navbar onToggleAlert={onOpen} />
        <Container maxWidth="100%">
          <div>ini halaman main</div>
        </Container>
      </div>

      <SignOutAlert isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Page;
