import { ReactNode } from 'react';

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
  inn: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  middleName: string;
  lastName: string;
  personalDataApproval: boolean;
  callsRecievApproval: boolean;
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
  is_contractor: boolean;
  created_at: string;
  avatar: string;
  organization: {
    id: string;
    short_name: string;
    inn: string;
  }
}

export interface QuestionT {
  title: string;
  textComponent: ReactNode;
}
