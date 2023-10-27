import { useLocation } from "react-router-dom";
import { useUserStore } from "@/stores";
import { HeaderProps } from "./types/types";
import { NavbarApp, NavbarHome } from "./components";

export default function Header({ onOpenAlert, onToggleSidebar }: HeaderProps) {
  const { pathname } = useLocation();

  const username = useUserStore((state) => state.username);

  if (pathname === "/main") return <NavbarHome onOpenAlert={onOpenAlert} />;

  return <NavbarApp onOpenAlert={onOpenAlert} onToggleSidebar={onToggleSidebar} username={username} />;
}
