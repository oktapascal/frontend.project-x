import { IUser } from "./IUser";

export interface FormInput {
  username: string;
  password: string;
}

interface FieldError extends Partial<FormInput> {}

export interface FormError {
  error: string;
  statusCode: number;
  message: FieldError[];
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: IUser;
}
