import { useRef } from "react";
import { useSignal } from "@preact/signals-react";
import { useNavigate } from "react-router-dom";
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
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "@/utils";
import { useUserStore, useModuleStore } from "@/stores";
import { SignOutAlertProps } from "./types";

export default function SignOutAlert({ isOpen, onClose }: SignOutAlertProps) {
  const isLoading = useSignal<boolean>(false);

  const cancelRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const toast = useToast();

  const resetUser = useUserStore((state) => state.reset);
  const resetModule = useModuleStore((state) => state.reset);

  const onSignOut = async () => {
    isLoading.value = true;

    const response = await axiosInstance.patch(
      "/auth/logout",
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    isLoading.value = false;

    if (response.status === 200) {
      resetUser();
      resetModule();

      toast({
        title: "Kamu berhasil keluar",
        variant: "solid",
        status: "info",
      });

      navigate("/login", { replace: true });
    }
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
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
              onClick={onSignOut}
              type="button"
              marginLeft="0.5rem"
              backgroundColor="#0058e4"
              color="#ffffff"
              disabled={isLoading.value}
              _hover={{ backgroundColor: "#004fcd" }}
              _active={{ backgroundColor: "#0046b6" }}
            >
              Keluar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
