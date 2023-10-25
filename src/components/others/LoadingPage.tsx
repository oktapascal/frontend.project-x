import { Flex, Center, Spinner, Text } from "@chakra-ui/react";

export default function LoadingPage() {
  return (
    <Flex flexDirection="column" height="25rem" justifyContent="center">
      <Center>
        <Spinner size="xl" />
      </Center>
      <Center marginTop={6}>
        <Text as="h1">Memuat Halaman...</Text>
      </Center>
    </Flex>
  );
}
