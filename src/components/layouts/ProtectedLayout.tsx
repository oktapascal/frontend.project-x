import { FC, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useUserStore } from "@/stores";
import { NavbarApp, NavbarHome } from "../navbars";
import { SignOutAlert } from "../alerts";
import { SidebarParentApp, SidebarChildApp } from "../sidebars";

import "@/assets/styles/app.min.css";

const ProtectedLayout: FC = () => {
  const navRef = useRef(useNavigate());

  const user_id = useUserStore((state) => state.user_id);

  const { pathname } = useLocation();
  const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();
  const { isOpen: isOpenParentSidebar, onToggle: onToggleParentSidebar, onClose: onCloseParentSidebar } = useDisclosure();
  const { isOpen: isOpenChildSidebar } = useDisclosure();

  const [shouldRenderParentSidebar, setShouldRenderParentSidebar] = useState<boolean>(false);
  const [shouldRenderChildSidebar, setShouldRenderChildSidebar] = useState<boolean>(false);

  useEffect(() => {
    if (user_id === null) navRef.current("/login");
    setShouldRenderParentSidebar(isOpenParentSidebar && pathname !== "/main");
    setShouldRenderChildSidebar(isOpenChildSidebar && pathname !== "/main");
  }, [user_id, isOpenParentSidebar, isOpenChildSidebar, pathname]);

  return (
    <>
      <div className={pathname === "/main" ? "bg-main" : "bg-private"}>
        {pathname === "/main" ? (
          <NavbarHome onToggleAlert={onOpenAlert} />
        ) : (
          <NavbarApp onToggleAlert={onOpenAlert} onToggleSidebar={onToggleParentSidebar} />
        )}
        <Outlet />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {shouldRenderParentSidebar && <SidebarParentApp onHideSidebar={onCloseParentSidebar} />}
      </AnimatePresence>

      {shouldRenderChildSidebar && <SidebarChildApp />}

      <SignOutAlert isOpen={isOpenAlert} onClose={onCloseAlert} />
    </>
  );
};

export default ProtectedLayout;
