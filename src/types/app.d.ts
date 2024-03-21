export interface ObjectInfoT {
  name: string;
  count: number;
  image: string;
  isActive: boolean;
}

export interface CleaningTypeT {
  name: string;
  count: number;
  image: string;
  isActive: boolean;
  padding: number;
}

export interface RegisterFormValuesT {
  inn: number | undefined;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface LoginFormValuesT {
  email: string;
  password: string;
}

export interface UserInfoT {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  verified: boolean;
  role: number;
  created_at: string;
}
