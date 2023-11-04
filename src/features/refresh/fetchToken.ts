import { axiosInstance } from "@/utils";

interface CredentialsResponse {
  access_token: string;
  refresh_token: string;
}

export default async function fetchToken() {
  const request = await axiosInstance.patch(
    "/auth/refresh",
    {},
    {
      headers: {
        Accept: "application/json",
        "X-NO-RETRY": "true",
      },
      withCredentials: true,
    }
  );

  const response = request.data as CredentialsResponse;

  return response;
}
