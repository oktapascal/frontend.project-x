import {
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Link,
  Popover,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ButtonIcon } from "@/components/buttons";
import { NavbarAppProps } from "@/layouts/components/Header/components/NavbarApp/interface";
import UserProfile from "@/layouts/components/Header/components/UserProfile";
import ListModules from "@/layouts/components/Header/components/ListModules";
import Logo from "@/assets/images/logo.webp";

export default function NavbarApp({ username, onOpenAlert, onToggleSidebar }: NavbarAppProps) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <nav className="shadow-md bg-white px-4 py-2 z-50 relative">
      <Flex flexDirection="row" justifyContent="space-between">
        <Box width="33.3333333333%">
          <ButtonIcon label="Toggle Menu" tooltipPlacement="right" icon={<i className="ri-menu-fill icon-small" />} onClick={onToggleSidebar} />
        </Box>
        <Center width="33.3333333333%">
          <Image alt="logo" src={Logo} width="4rem" />
        </Center>
        <Box width="33.3333333333%">
          <Flex flexDirection="row" justifyContent="flex-end">
            <Center>
              <UserProfile username={username} onOpenAlert={onOpenAlert} />
            </Center>
            <Center>
              <ButtonIcon label="Notification" tooltipPlacement="bottom" icon={<i className="ri-notification-2-fill icon-small" />} />
            </Center>
            <Center>
              <ButtonIcon label="New Tab" tooltipPlacement="bottom" icon={<i className="ri-file-copy-line icon-small" />} />
            </Center>
            <Center>
              <ButtonIcon label="Fullscreen" tooltipPlacement="bottom" icon={<i className="ri-fullscreen-fill icon-small" />} />
            </Center>
            <Center>
              <ButtonIcon label="Modules" tooltipPlacement="bottom" icon={<i className="ri-command-line icon-small" />} onClick={onToggle} />
              <Popover isOpen={isOpen} onClose={onClose}>
                <PopoverContent position="fixed" right="0.8rem" top="3.8rem">
                  <PopoverCloseButton />
                  <PopoverHeader>
                    <Text as="h4" fontWeight="semibold" fontSize="1.2rem">
                      Modules
                    </Text>
                  </PopoverHeader>
                  <PopoverBody paddingInlineStart="0" paddingInlineEnd="0">
                    <ListModules />
                    <Divider />
                    <Flex justifyContent="center">
                      <Center>
                        <Link as={NavLink} to="/main" fontSize="1rem" paddingTop="0.3rem" paddingBottom="0.3rem" fontWeight="medium">
                          Show All Modules
                        </Link>
                      </Center>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Center>
          </Flex>
        </Box>
      </Flex>
    </nav>
  );
}
