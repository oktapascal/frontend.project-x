import { FC } from "react";
import { Flex, Spinner, Center, Text } from "@chakra-ui/react";

const Loading: FC = () => {
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
};

export default Loading;
