import { Button, Center, List, ListItem, Tag, Text } from "@chakra-ui/react";
import { useFetchModules } from "@/features/moduleUser";
import { useModuleStore } from "@/stores";

export default function ListModules() {
  const module_id = useModuleStore((state) => state.module_id);

  const { data, error } = useFetchModules();

  if (error) return <div>unknown error {error.message}</div>;

  return (
    <List spacing={2}>
      {data?.map((module) => (
        <ListItem key={module.module_id}>
          <Button width="100%" backgroundColor="transparent" borderRadius="0">
            <Center>
              <i className={`${module.module_icon} icon-small`} />
            </Center>
            <Center>
              <Text as="h6" fontSize="1rem" fontWeight="medium" paddingLeft={2}>
                {module.name}
              </Text>
            </Center>
            <Center marginLeft="auto">
              {module.module_id === module_id && (
                <Tag size="sm" backgroundColor="#15803d" color="#ffffff">
                  Sekarang
                </Tag>
              )}
            </Center>
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
