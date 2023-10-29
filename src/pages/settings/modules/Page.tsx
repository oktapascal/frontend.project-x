import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  Center,
  Select,
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
          <Flex flexDirection="row" justifyContent="space-between">
            <Box>
              <HStack spacing={3}>
                <Box>
                  <Text as={"span"} fontSize="0.8rem" fontWeight="semibold">
                    Rows Per Page :
                  </Text>
                </Box>
                <Box>
                  <Select size="xs" fontWeight="bold">
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </Select>
                </Box>
                <Box>
                  <Text as="span" fontSize="0.8rem" fontWeight="semibold">
                    1 - 10 of 300
                  </Text>
                </Box>
                <Box>
                  <IconButton
                    aria-label="First Page"
                    icon={<i className="ri-arrow-left-double-line icon-extra-small" />}
                    size="xs"
                    backgroundColor="transparent"
                  />
                </Box>
                <Box>
                  <IconButton
                    aria-label="First Page"
                    icon={<i className="ri-arrow-drop-left-line icon-small" />}
                    size="xs"
                    backgroundColor="transparent"
                  />
                </Box>
                <Box>
                  <IconButton
                    aria-label="First Page"
                    icon={<i className="ri-arrow-drop-right-line icon-small" />}
                    size="xs"
                    backgroundColor="transparent"
                  />
                </Box>
                <Box>
                  <IconButton
                    aria-label="First Page"
                    icon={<i className="ri-arrow-right-double-line icon-extra-small" />}
                    size="xs"
                    backgroundColor="transparent"
                  />
                </Box>
              </HStack>
            </Box>
            <Box width="20%">
              <Input type="text" placeholder="Search Data..." size="sm" />
            </Box>
          </Flex>
          <TableContainer overflowY="auto" marginTop="0.5rem" maxHeight="calc(100vh - 13.8rem)">
            <Table variant="simple">
              <Thead position="sticky" top={0} zIndex={5} backgroundColor="#2563eb">
                <Tr>
                  <Th width="10%" color="#ffffff">
                    Module ID
                  </Th>
                  <Th color="#ffffff">Module Name</Th>
                  <Th textAlign="center" width="10%" color="#ffffff">
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
