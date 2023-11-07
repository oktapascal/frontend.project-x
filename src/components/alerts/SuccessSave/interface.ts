export interface SuccessSaveAlertProps {
  id: string | number | null;
  isOpen: boolean;
  onClose: () => void;
  onCallback: () => void;
}
