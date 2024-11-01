import { object, ref, string } from 'yup';

export const resetPasswordSchema = object().shape({
  password: string().min(6, 'Пароль слишком короткий').required('Введите пароль'),
  confirmPassword: string()
    .required('Повторите пароль')
    .oneOf([ref('password')], 'Пароли не совпадают'),
});

export const forgotPasswordSchema = object().shape({
  email: string().email('Введите корректный email').required('Введите email'),
});
