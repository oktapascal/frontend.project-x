import { IMenuParent } from "@/types";

export interface SidebarProps {
  isOpenParentSidebar: boolean;
  isOpenChildSidebar: boolean;
  onCloseSidebar: () => void;
  onCloseAllSidebar: () => void;
  onOpenChildSidebar: () => void;
}

export interface SidebarParentAppProps extends Partial<SidebarProps> {
  menus: IMenuParent[];
}
