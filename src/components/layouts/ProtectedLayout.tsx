import { FC, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useUserStore } from "@/stores";
import { NavbarApp, NavbarHome } from "../navbars";
import { SignOutAlert } from "../alerts";

import "@/assets/styles/app.min.css";

const ProtectedLayout: FC = () => {
  const navRef = useRef(useNavigate());

  const user_id = useUserStore((state) => state.user_id);

  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (user_id === null) navRef.current("/login");
  }, [user_id]);

  return (
    <>
      <div className={pathname === "/main" ? "bg-main" : "bg-private"}>
        {pathname === "/main" ? (
          <NavbarHome onToggleAlert={onOpen} />
        ) : (
          <NavbarApp onToggleAlert={onOpen} />
        )}
        <Outlet />
      </div>

      <SignOutAlert isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ProtectedLayout;
