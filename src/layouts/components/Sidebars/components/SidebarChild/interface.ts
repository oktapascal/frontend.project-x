import { IMenuChild } from "@/interfaces/IMenu";

export interface SidebarChildAppProps {
  childMenus: IMenuChild[];
  onCloseAllSidebar: () => void;
}
