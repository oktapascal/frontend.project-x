import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
  Tr,
  Th,
  Td,
  TableContainer,
  ResponsiveValue,
} from "@chakra-ui/react";
import { ButtonIcon } from "@/components/buttons";
import { DataTable, DataTableController, DataTableSearch, DataTableRowNotFound, DataTableRowLoading } from "@/components/datatables";
import { useFetchModules } from "@/features/modules";
import { IModule } from "@/types";

type MetaTypes = {
  width: string;
  textAlign: ResponsiveValue<"center" | "end" | "justify" | "left" | "match-parent" | "right" | "start">;
};

export default function Page() {
  const { data, isLoading, error } = useFetchModules();

  const [globalFilter, setGlobalFilter] = useState<string>("");

  const queryClient = useQueryClient();

  const columns = useMemo<ColumnDef<IModule>[]>(
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
        accessorKey: "name",
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
        enableGlobalFilter: false,
        enableSorting: false,
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
    data: data ?? defaultData,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    debugTable: import.meta.env.DEV,
  });

  const onSetPageIndex = (index: number) => setPageIndex(index);
  const onSetPageSize = (size: number) => setPageSize(size);

  const reloadData = () => {
    queryClient.invalidateQueries({ queryKey: ["fetch.modules"] });
  };

  if (error) return <div>Error unknown : {error.message}</div>;

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
                    onClick={reloadData}
                  />
                </Box>
                <Box>
                  <Button
                    as={NavLink}
                    to="/settings/modules/create"
                    backgroundColor="#2563eb"
                    color="#ffffff"
                    _hover={{ backgroundColor: "#4338ca" }}
                    _active={{ backgroundColor: "#3730a3" }}
                  >
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
            <DataTableSearch value={globalFilter} onChange={(value) => setGlobalFilter(String(value))} />
          </Flex>
          <TableContainer overflowY="auto" marginTop="0.5rem" maxHeight="calc(100vh - 12.6rem)">
            <DataTable
              tablehead={getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const meta = header.column.columnDef.meta as MetaTypes;

                    return (
                      <Th
                        key={header.id}
                        width={meta.width}
                        textAlign={meta.textAlign}
                        color="#ffffff"
                        className={header.column.getCanSort() ? "select-none cursor-pointer" : ""}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {!header.column.getIsSorted() ? null : header.column.getIsSorted().toString() === "asc" ? (
                          <i className="ri-arrow-drop-up-fill icon-extra-small" />
                        ) : (
                          <i className="ri-arrow-drop-down-fill icon-extra-small" />
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              ))}
              tablebody={
                isLoading ? (
                  <DataTableRowLoading colSpan={3} />
                ) : getRowModel().rows.length === 0 ? (
                  <DataTableRowNotFound colSpan={3} />
                ) : (
                  getRowModel().rows.map((row) => (
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
                  ))
                )
              }
            />
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
}
