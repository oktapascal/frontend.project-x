import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
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
import { axiosInstance } from "@/utils";
import { useUserStore, useModuleStore } from "@/stores";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignOutAlert({ isOpen, onClose }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const cancelRef = useRef<HTMLButtonElement>(null);

  const [, , removeCookieSessionToken] = useCookies(["session-token"]);
  const [, , removeCookieSessionRefreshToken] = useCookies(["session-refresh-token"]);

  const navigate = useNavigate();

  const resetUser = useUserStore((state) => state.reset);
  const resetModule = useModuleStore((state) => state.reset);

  const onSignOut = async () => {
    setLoading(true);

    const response = await axiosInstance.patch(
      "/auth/logout",
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    setLoading(false);

    if (response.status === 200) {
      resetUser();
      resetModule();

      removeCookieSessionToken("session-token", { path: "/" });
      removeCookieSessionRefreshToken("session-refresh-token", { path: "/" });

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
              disabled={loading}
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
