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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCallback: () => void;
}

export default function BackFromFormAlert({ isOpen, onClose, onCallback }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading as="h6" fontSize="1.25rem">
              Keluar Form ?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>Semua perubahan tidak akan disimpan</Text>
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
              Kembali
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
