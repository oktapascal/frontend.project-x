import { Card, CardBody, Center, Heading, Image, Text } from "@chakra-ui/react";
import Logo from "@/assets/images/logo.webp";

export default function OnlyDekstopAccess() {
  return (
    <Center height="100vh">
      <Card backgroundColor="#f5f5f5" maxWidth="70%">
        <CardBody>
          <Center marginBottom={4}>
            <Image alt="logo" src={Logo} width="6rem" />
          </Center>
          <Center marginBottom={4}>
            <Heading as="h5" size="lg">
              Access On Dekstop
            </Heading>
          </Center>
          <Text color="#525252" fontSize="xl" align="center" fontWeight="medium">
            Esaku works best on dekstop screens. Please come back and access on dekstop.
          </Text>
        </CardBody>
      </Card>
    </Center>
  );
}
