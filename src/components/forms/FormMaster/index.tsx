import { Button, Card, CardHeader, CardBody, Center, Container, Divider, Flex, Heading, HStack } from "@chakra-ui/react";
import { ExitFormAlert } from "@/components/alerts";
import { FormMasterProps } from "@/components/forms/FormMaster/interface";

export default function FormMaster({ formID, title, children, isOpen, isDisabled, onOpen, onClose, onExitForm }: FormMasterProps) {
  return (
    <>
      <Container>
        <Card height="calc(100vh - 3.8rem)" width="100%">
          <CardHeader>
            <Flex flexDirection="row" justifyContent="space-between">
              <Center>
                <Heading as="h6" fontSize="1rem">
                  {title}
                </Heading>
              </Center>
              <Center>
                <HStack spacing={3}>
                  <Center>
                    <Button
                      form={formID}
                      isDisabled={isDisabled}
                      type="submit"
                      size="sm"
                      backgroundColor="#2563eb"
                      color="#ffffff"
                      _hover={{ backgroundColor: "#4338ca" }}
                      _active={{ backgroundColor: "#3730a3" }}
                    >
                      Simpan
                    </Button>
                  </Center>
                  <Center>
                    <Button size="sm" type="button" onClick={onOpen}>
                      Kembali
                    </Button>
                  </Center>
                </HStack>
              </Center>
            </Flex>
          </CardHeader>
          <Divider color="#a3a3a3" />
          <CardBody>{children}</CardBody>
        </Card>
      </Container>
      <ExitFormAlert isOpen={isOpen} onClose={onClose} onCallback={onExitForm} />
    </>
  );
}
