import axios, { AxiosError } from "axios";
import { FC, useEffect } from "react";
import { useCookies } from "react-cookie";
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
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores";
import { IUser } from "@/types";
import Background from "@/assets/images/background-login.webp";
import Logo from "@/assets/images/logo.webp";
import { FormError, FormInput } from "./types";
import { BackgroundOverlay } from "./components";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Response {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

const Page: FC = () => {
  const navigate = useNavigate();

  const user_id = useUserStore((state) => state.user_id);
  const updateUserStore = useUserStore((state) => state.update);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [, setSessionCookie] = useCookies(["session-token"]);
  const [, setSessionRefreshCookie] = useCookies(["session-refresh-token"]);

  useEffect(() => {
    document.title = "Project-X | Login";

    reset({}, { keepValues: true, keepErrors: true });
    if (user_id !== null) navigate("/main");
  }, [user_id, isSubmitted, navigate, reset]);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const request = await axios.post(`${BASE_URL}/auth/login`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const response = request.data as Response;

      const accessDate = new Date();
      const refreshDate = new Date();

      const minutes = 60 * 1000;
      const oneDay = 60 * 60 * 24 * 1000;

      const expiresAccess = accessDate.getTime() + minutes * 15;
      const expiresRefresh = refreshDate.getTime() + oneDay * 7;

      accessDate.setTime(expiresAccess);
      refreshDate.setTime(expiresRefresh);

      setSessionCookie("session-token", response.access_token, {
        expires: accessDate,
      });

      setSessionRefreshCookie("session-refresh-token", response.refresh_token, {
        expires: refreshDate,
      });

      updateUserStore(response.user);
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
          case 404:
            setError("username", { message: response.message[0].username });
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
                        autoComplete="off"
                        isReadOnly={isSubmitting}
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
                        isReadOnly={isSubmitting}
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
                  isDisabled={isSubmitting}
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
