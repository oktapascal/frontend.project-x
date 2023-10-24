import { ReactNode } from "react";

export interface SidebarProps {
  children?: ReactNode;
  onHideSidebar: () => void;
}
