import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Input, VStack, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { SuccessSaveAlert } from "@/components/alerts";
import { FormGroup, FormMaster } from "@/components/forms";
import { FormInput, FormError } from "@/interfaces/IModule";
import { useCreateModule } from "@/features/modules";

export default function CreateModulePage() {
  const FORM_ID = "module-form";

  const [moduleId, setModuleId] = useState<string | null>(null);

  const navigate = useNavigate();

  const { isOpen: isOpenExitFormAlert, onOpen: onOpenExitFormAlert, onClose: onCloseExitFormAlert } = useDisclosure();
  const { isOpen: isOpenSuccessCreateAlert, onOpen: onOpenSuccessCreateAlert, onClose: onCloseSuccessCreateAlert } = useDisclosure();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateModule();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      name: "",
      icon: "",
      default_view: "",
    },
  });

  const onExitForm = () => {
    navigate("/settings/modules", { state: { module_id: moduleId } });
  };

  const onCallbackSuccessCreate = () => {
    onExitForm();
    queryClient.invalidateQueries({ queryKey: ["fetch.modules"] });
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
      onSuccess: (result) => {
        setModuleId(result.module_id);
        reset();
        onOpenSuccessCreateAlert();
      },
    });
  };

  useEffect(() => {
    document.title = "Project-X | Modules Create Form";
  }, []);

  return (
    <>
      <FormMaster
        formID={FORM_ID}
        title="Tambah Data Module"
        isOpen={isOpenExitFormAlert}
        isDisabled={isPending}
        onClose={onCloseExitFormAlert}
        onExitForm={onExitForm}
        onOpen={onOpenExitFormAlert}
      >
        <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)} noValidate>
          <VStack>
            <FormGroup label="Nama Module" isInvalid={!!errors.name} errorMessage={errors.name?.message}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input type="text" placeholder="Nama Module..." autoComplete="off" isReadOnly={isPending} {...field} />}
              />
            </FormGroup>
            <FormGroup label="Icon Module" isInvalid={!!errors.icon} errorMessage={errors.icon?.message}>
              <Controller
                name="icon"
                control={control}
                render={({ field }) => <Input type="text" placeholder="Icon Module..." autoComplete="off" isReadOnly={isPending} {...field} />}
              />
            </FormGroup>
            <FormGroup label="Default View" isInvalid={!!errors.default_view} errorMessage={errors.default_view?.message}>
              <Controller
                name="default_view"
                control={control}
                render={({ field }) => <Input type="text" placeholder="Default View..." autoComplete="off" isReadOnly={isPending} {...field} />}
              />
            </FormGroup>
          </VStack>
        </form>
      </FormMaster>
      <SuccessSaveAlert id={moduleId} isOpen={isOpenSuccessCreateAlert} onClose={onCloseSuccessCreateAlert} onCallback={onCallbackSuccessCreate} />
    </>
  );
}
