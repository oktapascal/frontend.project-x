import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Flex,
  HStack,
  Center,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { ButtonIcon } from "@/components/buttons";
import data from "./fakeData";

export default function Page() {
  return (
    <Box paddingLeft={2} paddingRight={2}>
      <Card height="100%" width="100%">
        <CardHeader>
          <Flex flexDirection="row" justifyContent="space-between">
            <Center>
              <Text as="h6" fontWeight="medium">
                Data Modules
              </Text>
            </Center>
            <Center>
              <HStack>
                <Box>
                  <ButtonIcon
                    label="Reload Data"
                    tooltipPlacement="bottom"
                    backgroundColor="#e5e7eb"
                    icon={<i className="ri-loop-left-line icon-icon-small" />}
                  />
                </Box>
                <Box>
                  <Button backgroundColor="#2563eb" color="#ffffff" _hover={{ backgroundColor: "#4338ca" }} _active={{ backgroundColor: "#3730a3" }}>
                    Tambah
                  </Button>
                </Box>
              </HStack>
            </Center>
          </Flex>
        </CardHeader>
        <Divider />
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th width="10%">Module ID</Th>
                  <Th>Module Name</Th>
                  <Th textAlign="center" width="10%">
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((dt) => (
                  <Tr key={dt.module_id}>
                    <Td>{dt.module_id}</Td>
                    <Td>{dt.module_name}</Td>
                    <Td textAlign="center">
                      <HStack justifyContent="center">
                        <Box>
                          <ButtonIcon label="Show Data" tooltipPlacement="bottom" icon={<i className="ri-information-fill icon-extra-small" />} />
                        </Box>
                        <Box>
                          <ButtonIcon label="Edit Data" tooltipPlacement="bottom" icon={<i className="ri-edit-box-line icon-extra-small" />} />
                        </Box>
                        <Box>
                          <ButtonIcon label="Delete Data" tooltipPlacement="bottom" icon={<i className="ri-delete-bin-5-fill icon-extra-small" />} />
                        </Box>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
}
