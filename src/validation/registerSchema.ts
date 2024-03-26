import { AnySchema, object, ref, string } from 'yup';
import { RegisterFormValuesT } from '../types/app';

export const registerSchema = object().shape<Record<keyof RegisterFormValuesT, AnySchema>>({
  inn: string().length(10, 'ИНН должен состоять из 10 символов').required('ИНН обязательно!'),
  email: string().email('Некорректный e-mail').required('E-mail обязателен!'),
  phone: string(),
  password: string().min(6, 'Пароль слишком короткий').required('Введите пароль!'),
  repeatPassword: string()
    .oneOf([ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль!'),
  firstName: string(),
  lastName: string(),
  middleName: string(),
});
