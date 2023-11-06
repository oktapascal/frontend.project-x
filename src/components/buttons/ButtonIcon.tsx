import { IconButton, Tooltip } from "@chakra-ui/react";
import { ButtonIconProps } from "./types";

export default function ButtonIcon({ label, icon, tooltipPlacement, backgroundColor = "transparent", onClick }: ButtonIconProps) {
  return (
    <Tooltip label={label} placement={tooltipPlacement}>
      <IconButton type="button" backgroundColor={backgroundColor} aria-label={label} icon={icon} onClick={onClick} />
    </Tooltip>
  );
}
