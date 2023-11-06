export interface IModule {
  id: number;
  module_id: string;
  module_icon: string;
  name: string;
  default_view: string | null;
  status_active: boolean;
}

export interface FormInput {
  name: string;
  icon: string;
  default_view: string;
}

interface FieldError extends Partial<FormInput> {}

export interface FormError {
  error: string;
  statusCode: number;
  message: FieldError[];
}

export interface FormResponse {
  id: number;
  module_id: string;
  name: string;
  status_active: boolean;
  module_icon: string;
  default_view: string;
}
