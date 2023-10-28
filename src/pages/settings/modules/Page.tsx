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
                  <Th>Module ID</Th>
                  <Th>Module Name</Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>MDL.001</Td>
                  <Td>Settings</Td>
                  <Td textAlign="center">
                    <IconButton aria-label="Actions Button" icon={<i className="ri-more-fill icon-extra-small" />} height="2rem" width="2rem" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>MDL.002</Td>
                  <Td>Lands</Td>
                  <Td textAlign="center">
                    <IconButton aria-label="Actions Button" icon={<i className="ri-more-fill icon-extra-small" />} height="2rem" width="2rem" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>MDL.003</Td>
                  <Td>Buildings</Td>
                  <Td textAlign="center">
                    <IconButton aria-label="Actions Button" icon={<i className="ri-more-fill icon-extra-small" />} height="2rem" width="2rem" />
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
