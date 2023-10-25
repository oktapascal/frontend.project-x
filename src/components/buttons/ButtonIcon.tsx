import { ReactElement } from "react";
import { IconButton, Tooltip, PlacementWithLogical } from "@chakra-ui/react";

interface Props {
  label: string;
  tooltipPlacement: PlacementWithLogical;
  icon: ReactElement;
  onClick?: () => void;
}

export default function ButtonIcon({ label, icon, tooltipPlacement, onClick }: Props) {
  return (
    <Tooltip label={label} placement={tooltipPlacement}>
      <IconButton backgroundColor="transparent" aria-label={label} icon={icon} onClick={onClick} />
    </Tooltip>
  );
}
