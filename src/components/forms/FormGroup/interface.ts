import type { ReactNode } from "react";
export interface FormGroupProps {
  isInvalid?: boolean;
  label: string;
  children: ReactNode;
  errorMessage?: string;
}
