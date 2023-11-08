import { Table, TableContainer, Thead, Tbody } from "@chakra-ui/react";
import { DataTableProps } from "@/components/tables/DataTableClient/interface";

export default function DataTable({ tablehead, tablebody }: DataTableProps) {
  return (
    <TableContainer overflowY="auto" marginTop="0.5rem" maxHeight="calc(100vh - 12.6rem)">
      <Table variant="simple">
        <Thead position="sticky" top={0} zIndex={5} backgroundColor="#2563eb">
          {tablehead}
        </Thead>
        <Tbody>{tablebody}</Tbody>
      </Table>
    </TableContainer>
  );
}
