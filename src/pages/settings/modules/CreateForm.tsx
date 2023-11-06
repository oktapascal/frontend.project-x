import { AxiosError } from "axios";
import { FormControl, FormLabel, Input, FormErrorMessage, VStack, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormMaster } from "@/components/forms";
import { FormInput, FormError } from "@/types/IModule";
import { useCreateModule } from "@/features/modules";

export default function CreateForm() {
  const FORM_ID = "module-form";

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate, isPending } = useCreateModule();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
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
    mutate(data, {
      onError: (error) => {
        if (error instanceof AxiosError) {
          const response = error.response?.data as FormError;

          switch (response.statusCode) {
            case 400:
              if (response.message[0].default_view) setError("default_view", { message: response.message[0].default_view });
              if (response.message[0].icon) setError("icon", { message: response.message[0].icon });
              if (response.message[0].name) setError("name", { message: response.message[0].name });
              break;
            default:
              alert("Error Unknown");
              break;
          }
        }
      },
    });
  };

  return (
    <FormMaster
      formID={FORM_ID}
      title="Tambah Data Module"
      isOpen={isOpen}
      isDisabled={isPending}
      onClose={onClose}
      onExitForm={onExitForm}
      onOpen={onOpen}
    >
      <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Nama Module</FormLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input type="text" placeholder="Nama Module..." autoComplete="off" isReadOnly={isPending} {...field} />}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.icon}>
            <FormLabel>Icon Module</FormLabel>
            <Controller
              name="icon"
              control={control}
              render={({ field }) => <Input type="text" placeholder="Icon Module..." autoComplete="off" isReadOnly={isPending} {...field} />}
            />
            <FormErrorMessage>{errors.icon?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.default_view}>
            <FormLabel>Default View</FormLabel>
            <Controller
              name="default_view"
              control={control}
              render={({ field }) => <Input type="text" placeholder="Default View..." autoComplete="off" isReadOnly={isPending} {...field} />}
            />
            <FormErrorMessage>{errors.default_view?.message}</FormErrorMessage>
          </FormControl>
        </VStack>
      </form>
    </FormMaster>
  );
}
