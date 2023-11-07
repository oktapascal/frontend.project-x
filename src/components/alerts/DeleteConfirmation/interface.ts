export interface DeleteConfirmationAlertPros {
  id: string | number | null;
  isOpen: boolean;
  onClose: () => void;
  onCallback: () => void;
}
