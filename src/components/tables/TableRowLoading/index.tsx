import { Spinner, Tr, Td } from "@chakra-ui/react";
import { TableRowLoadingProps } from "@/components/tables/TableRowLoading/interface";

export default function TableRowLoading({ colSpan }: TableRowLoadingProps) {
  return (
    <Tr>
      <Td textAlign="center" colSpan={colSpan}>
        <Spinner size="md" color="#a3a3a3" />
      </Td>
    </Tr>
  );
}
