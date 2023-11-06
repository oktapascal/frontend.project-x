export interface BackFromFormAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onCallback: () => void;
}

export interface SignOutAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SuccessCreateAlertProps extends BackFromFormAlertProps {
  id: string | number | null;
}
