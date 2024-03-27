import { object, string } from 'yup';

export const loginSchema = object().shape({
  email: string().email('Некорректный e-mail').required('Введите e-mail'),
  password: string().required('Введите пароль'),
});
