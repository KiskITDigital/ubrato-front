import { AnySchema, boolean, object, ref, string } from 'yup';
import { RegisterFormValuesT } from '../types/app';

export const registerSchema = object().shape<Record<keyof RegisterFormValuesT, AnySchema>>({
  inn: string().length(10, 'ИНН должен состоять из 10 символов').required('Введите ИНН'),
  email: string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      { message: 'Некорректный e-mail' }
    )
    .required('E-mail обязателен!'),
  phone: string().required('Телефон обязателен!'),
  password: string()
    .min(8, 'Пароль слишком короткий')
    .matches(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/, {
      message: 'Пароль должен содержать хотя бы 1 букву и цифру',
    })
    .required('Введите пароль!'),
  repeatPassword: string()
    .oneOf([ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль!'),
  firstName: string().required('Введите имя'),
  lastName: string().required('Введите фамилию'),
  middleName: string(),
  personalDataAgreement: boolean().oneOf([true], 'Обязательное поле'),
});
