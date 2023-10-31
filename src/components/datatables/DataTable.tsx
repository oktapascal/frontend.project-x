import { ReactNode } from "react";
import { Table, Thead, Tbody } from "@chakra-ui/react";

interface Props {
  tablehead: ReactNode;
  tablebody: ReactNode;
}

export default function DataTable({ tablehead, tablebody }: Props) {
  return (
    <Table variant="simple">
      <Thead position="sticky" top={0} zIndex={5} backgroundColor="#2563eb">
        {tablehead}
      </Thead>
      <Tbody>{tablebody}</Tbody>
    </Table>
  );
}
