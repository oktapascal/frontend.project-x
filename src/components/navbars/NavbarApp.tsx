import { FC } from "react";
import { Box, Center, Flex, Image } from "@chakra-ui/react";
import { ButtonIcon } from "@/components/buttons";
import { UserProfile } from "./components";
import Logo from "@/assets/images/logo.webp";
import { NavbarProps } from "./types";

const NavbarApp: FC<NavbarProps> = ({ onToggleAlert }) => {
  return (
    <nav className="shadow-md bg-white-80 px-4 py-2">
      <Flex flexDirection="row" justifyContent="space-between">
        <Box width="33.3333333333%">
          <ButtonIcon
            label="Toggle Menu"
            tooltipPlacement="right"
            icon={<i className="ri-menu-fill icon-small" />}
          />
        </Box>
        <Center width="33.3333333333%">
          <Image alt="logo" src={Logo} width="4rem" />
        </Center>
        <Box width="33.3333333333%">
          <Flex flexDirection="row" justifyContent="flex-end">
            <Center>
              <UserProfile onToggleAlert={onToggleAlert} />
            </Center>
            <Center>
              <ButtonIcon
                label="Notification"
                tooltipPlacement="bottom"
                icon={<i className="ri-notification-2-fill icon-small" />}
              />
            </Center>
            <Center>
              <ButtonIcon
                label="New Tab"
                tooltipPlacement="bottom"
                icon={<i className="ri-file-copy-line icon-small" />}
              />
            </Center>
            <Center>
              <ButtonIcon
                label="Fullscreen"
                tooltipPlacement="bottom"
                icon={<i className="ri-fullscreen-fill icon-small" />}
              />
            </Center>
            <Center>
              <ButtonIcon
                label="Modules"
                tooltipPlacement="bottom"
                icon={<i className="ri-command-line icon-small" />}
              />
            </Center>
          </Flex>
        </Box>
      </Flex>
    </nav>
  );
};

export default NavbarApp;
