import type { ReactNode } from "react";

export interface FormMasterProps {
  formID: string;
  title: string;
  children: ReactNode;
  isOpen: boolean;
  isDisabled: boolean;
  onOpen: () => void;
  onClose: () => void;
  onExitForm: () => void;
}
