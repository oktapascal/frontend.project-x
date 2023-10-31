import { useState, useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Flex,
  HStack,
  Input,
  Center,
  Text,
  Tr,
  Th,
  Td,
  TableContainer,
  ResponsiveValue,
} from "@chakra-ui/react";
import { ButtonIcon } from "@/components/buttons";
import { DataTable, DataTableController } from "@/components/datatables";
import data, { IData } from "./fakeData";

type MetaTypes = {
  width: string;
  textAlign: ResponsiveValue<"center" | "end" | "justify" | "left" | "match-parent" | "right" | "start">;
};

export default function Page() {
  const [value] = useState(() => [...data]);

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: "module_id",
        id: "modules-id",
        header: "Module ID",
        cell: (info) => info.getValue(),
        meta: {
          width: "10%",
          textAlign: "left",
        },
      },
      {
        accessorKey: "module_name",
        id: "modules-name",
        header: "Module Name",
        cell: (info) => info.getValue(),
        meta: {
          width: "auto",
          textAlign: "left",
        },
      },
      {
        id: "modules-actions",
        header: "Actions",
        meta: {
          width: "10%",
          textAlign: "center",
        },
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
      },
    ],
    []
  );
  const defaultData = useMemo(() => [], []);

  const {
    previousPage,
    nextPage,
    getHeaderGroups,
    getRowModel,
    getState,
    getPageCount,
    getCanPreviousPage,
    getCanNextPage,
    setPageSize,
    setPageIndex,
  } = useReactTable({
    data: value ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: import.meta.env.DEV,
  });

  const onSetPageIndex = (index: number) => setPageIndex(index);
  const onSetPageSize = (size: number) => setPageSize(size);

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
            <DataTableController
              getState={getState}
              getPageCount={getPageCount}
              getCanNextPage={getCanNextPage}
              getCanPreviousPage={getCanPreviousPage}
              nextPage={nextPage}
              previousPage={previousPage}
              setPageSize={onSetPageSize}
              setPageIndex={onSetPageIndex}
            />
            <Box>
              <Input type="text" placeholder="Search Data..." size="sm" htmlSize={30} width="auto" />
            </Box>
          </Flex>
          <TableContainer overflowY="auto" marginTop="0.5rem" maxHeight="calc(100vh - 12.6rem)">
            <DataTable
              tablehead={getHeaderGroups().map((headerGroup) => (
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
              tablebody={getRowModel().rows.map((row) => (
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
            />
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
}
