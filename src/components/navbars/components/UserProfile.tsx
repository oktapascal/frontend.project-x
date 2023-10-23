import { FC } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { NavbarProps } from "../types";

const UserProfile: FC<NavbarProps> = ({ onToggleAlert }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<i className="ri-arrow-down-s-fill icon-small" />}
        minWidth="9.37rem"
      >
        superadmin
      </MenuButton>
      <MenuList>
        <MenuItem>ini buat user profile</MenuItem>
        <MenuItem>
          <i className="ri-user-3-fill icon-extra-small" />
          <Text as="span" marginLeft={2} fontSize="0.9rem">
            My Account
          </Text>
        </MenuItem>
        <MenuItem onClick={onToggleAlert}>
          <i className="ri-logout-box-line icon-extra-small" />
          <Text as="span" marginLeft={2} fontSize="0.9rem">
            Sign Out
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserProfile;
