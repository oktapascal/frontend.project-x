import { Spinner, Tr, Td } from "@chakra-ui/react";
import { DataTableRowLoadingProps } from "./types";

export default function LoadingRow({ colSpan }: DataTableRowLoadingProps) {
  return (
    <Tr>
      <Td textAlign="center" colSpan={colSpan}>
        <Spinner size="md" color="#a3a3a3" />
      </Td>
    </Tr>
  );
}
