import { FC } from "react";
import { Center, Flex, Image } from "@chakra-ui/react";
import { ButtonIcon } from "@/components/buttons";
import Logo from "@/assets/images/logo.webp";

const NavbarApp: FC = () => {
  return (
    <nav className="shadow-md bg-white-80 px-4 py-2">
      <Flex flexDirection="row" justifyContent="space-between">
        <Center>
          <ButtonIcon
            label="Toggle Menu"
            tooltipPlacement="right"
            icon={<i className="ri-menu-fill icon-small" />}
          />
        </Center>
        <Center>
          <Image alt="logo" src={Logo} width="4rem" />
        </Center>
        <Center>
          <Flex flexDirection="row">
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
        </Center>
      </Flex>
    </nav>
  );
};

export default NavbarApp;
