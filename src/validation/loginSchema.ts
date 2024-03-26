import { object, string } from 'yup';

export const loginSchema = object().shape({
  email: string().required('Введите e-mail'),
  password: string().required('Введите пароль'),
});
