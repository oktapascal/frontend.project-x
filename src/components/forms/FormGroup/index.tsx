import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { FormGroupProps } from "@/components/forms/FormGroup/interface";

export default function FormGroup({ children, label, errorMessage, isInvalid }: FormGroupProps) {
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
