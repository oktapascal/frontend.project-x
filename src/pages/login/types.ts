export interface FormInput {
  username: string;
  password: string;
}

interface FieldError {
  username?: string;
  password?: string;
}

export interface FormError {
  error: string;
  statusCode: number;
  message: FieldError[];
}
