import { FC } from "react";
import { useDisclosure, Container, Grid, GridItem } from "@chakra-ui/react";
import { Navbar, SignOutAlert } from "./components";

import "./styles/styles.min.css";

const Page: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="bg-main">
        <Navbar onToggleAlert={onOpen} />
        <Container maxWidth="100%">
          <Grid templateColumns="repeat(4, 1fr)">
            <GridItem>1</GridItem>
            <GridItem>2</GridItem>
            <GridItem>3</GridItem>
            <GridItem>4</GridItem>
          </Grid>
        </Container>
      </div>

      <SignOutAlert isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Page;
