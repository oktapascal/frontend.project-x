import { FC } from "react";
import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { NavbarProps } from "../types";
import avatar from "@/assets/images/avatar.webp";

interface Props extends NavbarProps {
  username: string | null;
}

const UserProfile: FC<Props> = ({ onToggleAlert, username }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<i className="ri-arrow-down-s-fill icon-small" />}
        minWidth="9.37rem"
      >
        {username}
      </MenuButton>
      <MenuList>
        <Flex flexDirection="row" padding="0.375rem 1rem 0 1rem">
          <Image
            alt="avatar"
            src={avatar}
            width="2.8rem"
            height="2.8rem"
            rounded="9999px"
          />
          <Flex flexDirection="column" marginLeft={2}>
            <Text>superadmin</Text>
            <Text>-</Text>
          </Flex>
        </Flex>
        <MenuDivider />
        <MenuItem>
          <i className="ri-user-3-fill icon-extra-small" />
          <Text as="span" marginLeft={2} fontSize="0.9rem">
            My Account
          </Text>
        </MenuItem>
        <MenuDivider />
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
