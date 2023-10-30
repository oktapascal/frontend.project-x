import { useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
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
  ResponsiveValue,
} from "@chakra-ui/react";
import { ButtonIcon } from "@/components/buttons";
import data, { IData } from "./fakeData";

type MetaTypes = {
  width: string;
  textAlign: ResponsiveValue<"center" | "end" | "justify" | "left" | "match-parent" | "right" | "start">;
};

const columnHelper = createColumnHelper<IData>();

const columns = [
  columnHelper.accessor("module_id", {
    id: "modules-id",
    header: "Module ID",
    cell: (info) => info.getValue(),
    meta: {
      width: "10%",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("module_name", {
    id: "modules-name",
    header: "Module Name",
    cell: (info) => info.getValue(),
    meta: {
      width: "auto",
      textAlign: "left",
    },
  }),
  columnHelper.display({
    id: "modules-actions",
    header: "Actions",
    cell: ({ row }) => (
      <>
        <HStack justifyContent="center">
          <Box>
            <ButtonIcon
              label="Show Data"
              tooltipPlacement="bottom"
              icon={<i className="ri-information-fill icon-extra-small" onClick={() => alert(JSON.stringify(row.original))} />}
            />
          </Box>
          <Box>
            <ButtonIcon
              label="Edit Data"
              tooltipPlacement="bottom"
              icon={<i className="ri-edit-box-line icon-extra-small" />}
              onClick={() => alert(JSON.stringify(row.original))}
            />
          </Box>
          <Box>
            <ButtonIcon
              label="Delete Data"
              tooltipPlacement="bottom"
              icon={<i className="ri-delete-bin-5-fill icon-extra-small" />}
              onClick={() => alert(JSON.stringify(row.original))}
            />
          </Box>
        </HStack>
      </>
    ),
    meta: {
      width: "10%",
      textAlign: "center",
    },
  }),
];

export default function Page() {
  const [value] = useState(() => [...data]);

  const table = useReactTable({
    data: value,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
        <CardBody paddingBottom={0}>
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
            <Box>
              <Input type="text" placeholder="Search Data..." size="sm" htmlSize={30} width="auto" />
            </Box>
          </Flex>
          <TableContainer overflowY="auto" marginTop="0.5rem" maxHeight="calc(100vh - 12.6rem)">
            <Table variant="simple">
              <Thead position="sticky" top={0} zIndex={5} backgroundColor="#2563eb">
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const meta = header.column.columnDef.meta as MetaTypes;

                      return (
                        <Th key={header.id} width={meta.width} textAlign={meta.textAlign} color="#ffffff">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Th>
                      );
                    })}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta as MetaTypes;

                      return (
                        <Td key={cell.id} textAlign={meta.textAlign}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Td>
                      );
                    })}
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
