import { Flex, Spinner, Center, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex flexDirection="column" height="25rem" justifyContent="center">
      <Center>
        <Spinner size="xl" color="#52525b" />
      </Center>
      <Center marginTop={6}>
        <Text as="p" color="#52525b">
          Memuat Modules...
        </Text>
      </Center>
    </Flex>
  );
}
