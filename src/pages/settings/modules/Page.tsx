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

export default function Page() {
  return (
    <Box paddingLeft={2} paddingRight={2} height="90%">
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
                <Tr>
                  <Td>MDL.001</Td>
                  <Td>Settings</Td>
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
                <Tr>
                  <Td>MDL.002</Td>
                  <Td>Lands</Td>
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
                <Tr>
                  <Td>MDL.003</Td>
                  <Td>Buildings</Td>
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
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
}
