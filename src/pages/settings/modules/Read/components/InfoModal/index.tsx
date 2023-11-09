import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { InfoModalProps } from "@/pages/settings/modules/Read/components/InfoModal/interface";
import { ModuleData } from "@/pages/settings/modules/Read/components/InfoModal/components";
import { LoadingData } from "@/components/others";
import { useFetchModule } from "@/features/modules";

export default function ModuleInfoModal({ moduleId, isOpen, onClose }: InfoModalProps) {
  const { data, isLoading, error } = useFetchModule(moduleId);

  if (error) return <div>unknown error {error.message}</div>;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Data Module {moduleId}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{isLoading ? <LoadingData /> : <ModuleData data={data} />}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
