import { FC } from "react";
import { Box, Card, CardBody, Flex, Center, Text } from "@chakra-ui/react";

interface Props {
  label: string;
}

const CardModule: FC<Props> = ({ label }) => {
  return (
    <Card
      as="button"
      width="100%"
      _hover={{ backgroundColor: "#004fcd", color: "#ffffff" }}
      _active={{ backgroundColor: "#0046b6", color: "#ffffff" }}
    >
      <CardBody width="100%">
        <Flex>
          <Center>
            <i className="ri-bank-fill icon-large"></i>
          </Center>
          <Box flex="1" paddingLeft={4} display="flex" alignItems="center">
            <Text>{label}</Text>
          </Box>
          <Center>
            <i className="ri-signal-tower-fill icon-small"></i>
          </Center>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CardModule;
