import { Table, Thead, Tbody } from "@chakra-ui/react";
import { DataTableProps } from "./types";

export default function DataTable({ tablehead, tablebody }: DataTableProps) {
  return (
    <Table variant="simple">
      <Thead position="sticky" top={0} zIndex={5} backgroundColor="#2563eb">
        {tablehead}
      </Thead>
      <Tbody>{tablebody}</Tbody>
    </Table>
  );
}
