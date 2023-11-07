import { IMenu, IMenuParent } from "@/interfaces/IMenu";

export interface SidebarParentAppProps {
  parentMenus: IMenuParent[];
  onOpenChildSidebar: () => void;
  onCloseSidebar: () => void;
  onSetChildMenus: (menus: IMenu[]) => void;
}
