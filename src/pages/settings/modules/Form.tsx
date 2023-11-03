import {
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  HStack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { BackFromFormAlert } from "@/components/alerts";
import { FormInput } from "@/types/IModule";

export default function Form() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormInput>({
    defaultValues: {
      name: "",
      icon: "",
      default_view: "",
    },
  });

  const onBackFromForm = () => {
    navigate("/settings/modules");
  };

  return (
    <Container>
      <Card height="calc(100vh - 3.8rem)" width="100%">
        <CardHeader>
          <Flex flexDirection="row" justifyContent="space-between">
            <Center>
              <Heading as="h6" fontSize="1rem">
                Tambah Data Module
              </Heading>
            </Center>
            <Center>
              <HStack spacing={3}>
                <Center>
                  <Button
                    form="module-form"
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
        <CardBody>
          <form id="module-form" noValidate>
            <VStack>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Nama Module</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input type="text" placeholder="Nama Module..." autoComplete="off" isReadOnly={isSubmitting} {...field} />}
                />
                <FormErrorMessage>ini untuk error</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.icon}>
                <FormLabel>Icon Module</FormLabel>
                <Controller
                  name="icon"
                  control={control}
                  render={({ field }) => <Input type="text" placeholder="Icon Module..." autoComplete="off" isReadOnly={isSubmitting} {...field} />}
                />
                <FormErrorMessage>ini untuk error</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.default_view}>
                <FormLabel>Default View</FormLabel>
                <Controller
                  name="default_view"
                  control={control}
                  render={({ field }) => <Input type="text" placeholder="Default View..." autoComplete="off" isReadOnly={isSubmitting} {...field} />}
                />
                <FormErrorMessage>ini untuk error</FormErrorMessage>
              </FormControl>
            </VStack>
          </form>
        </CardBody>
      </Card>
      <BackFromFormAlert isOpen={isOpen} onClose={onClose} onCallback={onBackFromForm} />
    </Container>
  );
}
