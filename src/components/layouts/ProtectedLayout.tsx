import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useLocalStorage } from "@/hooks";
import { NavbarApp, NavbarHome } from "../navbars";
import { SignOutAlert } from "../alerts";

import "@/assets/styles/app.min.css";

const ProtectedLayout: FC = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user] = useLocalStorage("session");

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [navigate, user]);

  return (
    <>
      <div className={pathname === "/main" ? "bg-main" : "bg-private"}>
        {pathname === "/main" ? (
          <NavbarHome onToggleAlert={onOpen} />
        ) : (
          <NavbarApp />
        )}
        <Outlet />
      </div>

      <SignOutAlert isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ProtectedLayout;
