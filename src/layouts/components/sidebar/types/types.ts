import { IMenu, IMenuChild, IMenuParent } from "@/interfaces/IMenu";

export interface SidebarProps {
  isOpenParentSidebar: boolean;
  isOpenChildSidebar: boolean;
  onCloseSidebar: () => void;
  onCloseAllSidebar: () => void;
  onOpenChildSidebar: () => void;
}

export interface SidebarParentAppProps extends Partial<SidebarProps> {
  parentMenus: IMenuParent[];
  onSetChildMenus: (menus: IMenu[]) => void;
}

export interface SidebarChildAppProps extends Partial<SidebarProps> {
  childMenus: IMenuChild[];
}
