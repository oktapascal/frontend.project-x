export interface SidebarProps {
  isOpenParentSidebar: boolean;
  isOpenChildSidebar: boolean;
  onCloseSidebar: () => void;
  onCloseAllSidebar: () => void;
  onOpenChildSidebar: () => void;
}

export interface SidebarParentAppProps extends SidebarProps {}
