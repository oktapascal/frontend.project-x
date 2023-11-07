import { ReactElement } from "react";
import type { PlacementWithLogical } from "@chakra-ui/react";

export interface ButtonIconProps {
  label: string;
  tooltipPlacement: PlacementWithLogical;
  icon: ReactElement;
  backgroundColor?: string;
  onClick?: () => void;
}
