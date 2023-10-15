import { FC, useRef } from "react";
import {
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Navbar } from "./components";

import "./styles/styles.min.css";

const Page: FC = () => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="bg-main">
        <Navbar onToggleAlert={onOpen} />
        <Container maxWidth="100%">
          <div>ini halaman main</div>
        </Container>
      </div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading as="h6" fontSize="1.25rem">
                Keluar Aplikasi ?
              </Heading>
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text>Semua halaman akses yang sama akan keluar.</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} type="button">
                Batal
              </Button>
              <Button
                ref={cancelRef}
                onClick={onClose}
                type="button"
                marginLeft="0.5rem"
                backgroundColor="#0058e4"
                color="#ffffff"
                _hover={{ backgroundColor: "#004fcd" }}
                _active={{ backgroundColor: "#0046b6" }}
              >
                Keluar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Page;
