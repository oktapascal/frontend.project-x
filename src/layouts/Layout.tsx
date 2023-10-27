import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { LoadingPage } from "@/components/others";
import { useUserStore } from "@/stores";
import { SignOutAlert } from "@/components/alerts";
import { Header, Sidebar } from "./components";

export default function Layout() {
  const { pathname } = useLocation();

  const navRef = useRef(useNavigate());

  const user_id = useUserStore((state) => state.user_id);

  const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();
  const { isOpen: isOpenParentSidebar, onOpen: onOpenParentSidebar, onClose: onCloseParentSidebar } = useDisclosure();
  const { isOpen: isOpenChildSidebar, onOpen: onOpenChildSidebar, onClose: onCloseChildSidebar } = useDisclosure();

  const onCloseSidebar = () => {
    if (isOpenChildSidebar) {
      onCloseChildSidebar();
      return;
    }

    onCloseParentSidebar();
  };

  const onCloseAllSidebar = () => {
    onCloseChildSidebar();
    onCloseParentSidebar();
  };

  const onToggleSidebar = () => {
    if (isOpenParentSidebar) {
      onCloseAllSidebar();
      return;
    }

    onOpenParentSidebar();
  };

  useEffect(() => {
    if (user_id === null) navRef.current("/login");
  }, [user_id]);

  return (
    <div className={pathname === "/login" ? "none" : pathname === "/main" ? "bg-main" : "bg-private"}>
      {user_id !== null && <Header onOpenAlert={onOpenAlert} onToggleSidebar={onToggleSidebar} />}

      {pathname !== "/main" && (
        <Sidebar
          isOpenParentSidebar={isOpenParentSidebar}
          isOpenChildSidebar={isOpenChildSidebar}
          onCloseSidebar={onCloseSidebar}
          onCloseAllSidebar={onCloseAllSidebar}
          onOpenChildSidebar={onOpenChildSidebar}
        />
      )}

      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>

      <SignOutAlert isOpen={isOpenAlert} onClose={onCloseAlert} />
    </div>
  );
}
