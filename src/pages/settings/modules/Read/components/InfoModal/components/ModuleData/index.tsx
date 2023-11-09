import { Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { ModuleDataProps } from "@/pages/settings/modules/Read/components/InfoModal/components/ModuleData/interface";

export default function ModuleData({ data }: ModuleDataProps) {
  if (!data) return <div>no data</div>;

  return (
    <Table>
      <Tbody>
        <Tr>
          <Td>ID Module</Td>
          <Td>{data.module_id}</Td>
        </Tr>
        <Tr>
          <Td>Nama Module</Td>
          <Td>{data.name}</Td>
        </Tr>
        <Tr>
          <Td>Default View</Td>
          <Td>{data.default_view}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}
