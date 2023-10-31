import { Spinner, Tr, Td } from "@chakra-ui/react";

interface Props {
  colSpan: number;
}

export default function LoadingRow({ colSpan }: Props) {
  return (
    <Tr>
      <Td textAlign="center" colSpan={colSpan}>
        <Spinner size="md" color="#a3a3a3" />
      </Td>
    </Tr>
  );
}
