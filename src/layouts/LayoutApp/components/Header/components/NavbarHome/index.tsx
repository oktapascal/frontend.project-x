import { Button, Center, Flex, Image } from "@chakra-ui/react";
import Logo from "@/assets/images/logo.webp";
import { NavbarHomeProps } from "@/layouts/LayoutApp/components/Header/components/NavbarHome/interface";

export default function NavbarHome({ onOpenAlert }: NavbarHomeProps) {
  return (
    <nav className="shadow-md bg-white-80 px-4 py-2">
      <Flex flexDirection="row">
        <Center flex="1">
          <Image alt="logo" src={Logo} width="4rem" />
        </Center>
        <Center>
          <Button
            variant="outline"
            borderColor="#dc2626"
            color="#dc2626"
            _hover={{
              backgroundColor: "#dc2626",
              color: "#ffffff",
            }}
            onClick={onOpenAlert}
          >
            Sign Out
          </Button>
        </Center>
      </Flex>
    </nav>
  );
}
