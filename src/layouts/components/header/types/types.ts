export interface HeaderProps {
  onOpenAlert: () => void;
  onToggleSidebar: () => void;
}

export interface NavbarAppProps extends Partial<HeaderProps> {
  username: string | null;
}
