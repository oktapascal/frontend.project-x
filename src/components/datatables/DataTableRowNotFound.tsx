import { Tr, Td } from "@chakra-ui/react";
import { DataTableRowNotFoundProps } from "./types";

export default function DataTableRowNotFound({ colSpan }: DataTableRowNotFoundProps) {
  return (
    <Tr>
      <Td textAlign="center" color="#a3a3a3" fontSize="0.95rem" fontWeight="semibold" colSpan={colSpan}>
        Data Not Found
      </Td>
    </Tr>
  );
}
