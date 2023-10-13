import axios, { AxiosError } from "axios";
import { FC } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormError, FormInput } from "./types";
import { setupInterceptors } from "../../utils";
import { BackgroundOverlay } from "./components";
import Background from "../../assets/images/background-login.webp";
import Logo from "../../assets/images/logo.webp";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const http = setupInterceptors(axios);

const Page: FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const response = await http.post(`${BASE_URL}/auth/login`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        const response = error.response?.data as FormError;

        switch (response.statusCode) {
          case 400:
            if (response.message[0].username)
              setError("username", { message: response.message[0].username });
            if (response.message[0].password)
              setError("password", { message: response.message[0].password });
            break;
          default:
            alert("Error Unknown");
            break;
        }
      }
    }
  };

  return (
    <Flex flexDirection="row" height="100vh">
      <Box width="70%" position="relative">
        <Image
          alt="background"
          src={Background}
          height="100%"
          objectFit="cover"
        />
        <BackgroundOverlay />
      </Box>
      <Box width="30%">
        <Flex flexDirection="column">
          <Center paddingTop="25%">
            <Image alt="logo" src={Logo} width="11rem" />
          </Center>
          <Center>
            <Text paddingTop="1rem" fontSize="1.2rem" fontWeight="semibold">
              Sign In
            </Text>
          </Center>
          <Box padding={10}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Flex flexDirection="column">
                <FormControl marginBottom={4} isInvalid={!!errors.username}>
                  <FormLabel>Username</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <i className="ri-user-fill"></i>
                    </InputLeftElement>
                  </InputGroup>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="Your username..."
                        paddingLeft={8}
                        isReadOnly={isLoading}
                        {...field}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.username?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl marginBottom={4} isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <i className="ri-key-fill"></i>
                    </InputLeftElement>
                  </InputGroup>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="password"
                        placeholder="Your password..."
                        paddingLeft={8}
                        isReadOnly={isLoading}
                        {...field}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  backgroundColor="#0058e4"
                  color="#ffffff"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  _hover={{ backgroundColor: "#004fcd" }}
                  _active={{ backgroundColor: "#0046b6" }}
                >
                  Sign In
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Page;
