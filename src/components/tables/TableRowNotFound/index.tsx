import { Tr, Td } from "@chakra-ui/react";
import { TableRowNotFoundProps } from "@/components/tables/TableRowNotFound/interface";

export default function DataTableRowNotFound({ colSpan }: TableRowNotFoundProps) {
  return (
    <Tr>
      <Td textAlign="center" color="#a3a3a3" fontSize="0.95rem" fontWeight="semibold" colSpan={colSpan}>
        Data Not Found
      </Td>
    </Tr>
  );
}
