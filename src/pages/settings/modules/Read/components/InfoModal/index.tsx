import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { InfoModalProps } from "@/pages/settings/modules/Read/components/InfoModal/interface";
import { LoadingData } from "@/components/others";
import { useFetchModule } from "@/features/modules";

export default function ModuleInfoModal({ moduleId, isOpen, onClose }: InfoModalProps) {
  const { data, isLoading } = useFetchModule(moduleId);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Data Module {moduleId}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <LoadingData />
          ) : (
            <Table>
              <Tbody>
                <Tr>
                  <Td>ID Module</Td>
                  <Td>{moduleId}</Td>
                </Tr>
                <Tr>
                  <Td>Nama Module</Td>
                  <Td>{data?.name}</Td>
                </Tr>
                <Tr>
                  <Td>Default View</Td>
                  <Td>{data?.default_view}</Td>
                </Tr>
              </Tbody>
            </Table>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
