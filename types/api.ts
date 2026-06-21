export interface ContactFormInput {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}
