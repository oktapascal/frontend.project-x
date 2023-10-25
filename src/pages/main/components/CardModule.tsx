import { FC } from "react";
import { Box, Card, CardBody, Flex, Center, Text } from "@chakra-ui/react";
import { useModuleStore } from "@/stores";

interface Props {
  label: string;
  icon: string;
  module_id: string;
  default_view?: string | null;
}

const CardModule: FC<Props> = ({ label, icon, module_id }) => {
  const moduleId = useModuleStore((state) => state.module_id);
  const updateModule = useModuleStore((state) => state.update);

  const onClickCard = (module_id: string) => {
    alert(module_id);

    updateModule({ module_id });
  };

  return (
    <Card
      as="button"
      width="100%"
      onClick={() => onClickCard(module_id)}
      _hover={{ backgroundColor: "#004fcd", color: "#ffffff" }}
      _active={{ backgroundColor: "#0046b6", color: "#ffffff" }}
    >
      <CardBody width="100%">
        <Flex>
          <Center>
            <i className={`${icon} icon-large`}></i>
          </Center>
          <Box flex="1" paddingLeft={4} display="flex" alignItems="center">
            <Text fontWeight="semibold">{label}</Text>
          </Box>
          {moduleId === module_id && (
            <Center>
              <i className="ri-signal-tower-fill icon-small"></i>
            </Center>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CardModule;
