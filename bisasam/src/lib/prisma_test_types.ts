export interface CreateUser {
  name: string;
  email: string;
  acceptTermsAndConditions: boolean;
}

export interface UpdateUser {
  id: number;
  name: string;
  email: string;
}
