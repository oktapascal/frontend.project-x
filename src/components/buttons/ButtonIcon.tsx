import { FC, ReactElement } from "react";
import { IconButton, Tooltip, PlacementWithLogical } from "@chakra-ui/react";

interface Props {
  label: string;
  tooltipPlacement: PlacementWithLogical;
  icon: ReactElement;
  onClick?: () => void;
}

const ButtonIcon: FC<Props> = ({ label, icon, tooltipPlacement, onClick }) => {
  return (
    <Tooltip label={label} placement={tooltipPlacement}>
      <IconButton
        backgroundColor="transparent"
        aria-label={label}
        icon={icon}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default ButtonIcon;
