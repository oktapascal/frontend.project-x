import { FormControl, FormLabel, Input, FormErrorMessage, VStack, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormMaster } from "@/components/forms";
import { FormInput } from "@/types/IModule";
import { useCreateModule } from "@/features/modules";

export default function CreateForm() {
  const FORM_ID = "module-form";

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate } = useCreateModule();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    defaultValues: {
      name: "",
      icon: "",
      default_view: "",
    },
  });

  const onExitForm = () => {
    navigate("/settings/modules");
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log("klik submit form");
    mutate(data);
  };

  return (
    <FormMaster formID={FORM_ID} title="Tambah Data Module" isOpen={isOpen} onClose={onClose} onExitForm={onExitForm} onOpen={onOpen}>
      <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)} noValidate>
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
    </FormMaster>
  );
}
