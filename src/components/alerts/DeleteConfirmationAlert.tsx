import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { DeleteConfirmationAlertPros } from "./types";

export default function DeleteConfirmationAlert({ id, isOpen, onClose, onCallback }: DeleteConfirmationAlertPros) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading as="h6" fontSize="1.25rem">
              Hapus Data ?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>
              Data akan terhapus secara permanen. <br />
              ID Data : <b>{id}</b>
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} type="button">
              Batal
            </Button>
            <Button
              ref={cancelRef}
              onClick={onCallback}
              type="button"
              marginLeft="0.5rem"
              backgroundColor="#0058e4"
              color="#ffffff"
              _hover={{ backgroundColor: "#004fcd" }}
              _active={{ backgroundColor: "#0046b6" }}
            >
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
