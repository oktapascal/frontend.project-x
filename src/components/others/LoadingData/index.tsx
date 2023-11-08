import { Center, Flex, Spinner } from "@chakra-ui/react";

export default function LoadingData() {
  return (
    <Flex justifyContent="center" height="calc(100vh - 20rem)">
      <Center>
        <Spinner size="lg" />
      </Center>
    </Flex>
  );
}
