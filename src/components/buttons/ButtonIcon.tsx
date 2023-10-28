import { ReactElement } from "react";
import { IconButton, Tooltip, PlacementWithLogical } from "@chakra-ui/react";

interface Props {
  label: string;
  tooltipPlacement: PlacementWithLogical;
  icon: ReactElement;
  backgroundColor?: string;
  onClick?: () => void;
}

export default function ButtonIcon({ label, icon, tooltipPlacement, backgroundColor = "transparent", onClick }: Props) {
  return (
    <Tooltip label={label} placement={tooltipPlacement}>
      <IconButton type="button" backgroundColor={backgroundColor} aria-label={label} icon={icon} onClick={onClick} />
    </Tooltip>
  );
}
