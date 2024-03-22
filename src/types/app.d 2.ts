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
