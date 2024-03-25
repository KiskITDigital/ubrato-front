import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { RegisterFormValuesT } from '../../types/app';
import { Checkbox, Input } from '@nextui-org/react';
import { registerSchema } from '../../validation/registerSchema';
import styles from './registerpage.module.css';
import { axiosInstance } from '../../utils/baseHttp';
import { useUserInfoStore } from '../../store/userInfoStore';

export const RegisterPage: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const userInfoStore = useUserInfoStore();

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmVisible = () => setIsConfirmVisible(!isConfirmVisible);

  const initialValues: RegisterFormValuesT = {
    inn: undefined,
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
    middleName: '',
  };

  const itemClasses = {
    input: styles.input,
    innerWrapper: styles.innerWrapper,
    base: styles.base,
    label: styles.label,
    errorMessage: styles.errorMessage,
    helperWrapper: styles.helperWrapper,
  };

  const formik = useFormik<RegisterFormValuesT>({
    initialValues: initialValues,
    onSubmit(values, formikHelpers) {
      console.log(values);
      console.log(formikHelpers);
      const parameters = {
        email: values.email,
        phone: values.phone,
        password: values.password,
        first_name: values.firstName,
        middle_name: values.middleName,
        last_name: values.lastName,
        inn: values.inn?.toString(),
        is_contractor: isContractor,
      };
      (async () => {
        const res = await axiosInstance.post(`/v1/auth/signup`, parameters);
        console.log(res);
        const token = localStorage.getItem('token');
        if (token) {
          userInfoStore.fetchUser(token);
        }
      })();
    },
    validationSchema: registerSchema,
  });

  const [isContractor, setIsContractor] = useState(false);

  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
  };

  return (
    <div className={`container ${styles.container}`}>
      <p>Я - заказчик</p>
      <Checkbox defaultSelected classNames={checkStyle} isDisabled />
      <p>Я - исполнитель</p>
      <Checkbox classNames={checkStyle} isSelected={isContractor} onValueChange={setIsContractor} />
      <form onSubmit={formik.handleSubmit}>
        <p>Создайте учетную запись</p>
        <div className={styles.inputContainer}>
          <Input
            id="email"
            name="email"
            type="email"
            label="Логин (Email)"
            value={formik.values.email}
            onChange={formik.handleChange}
            // onValueChange={formik.handleChange}
            variant="bordered"
            placeholder="Электронная почта"
            isInvalid={Boolean(formik.errors.email)}
            errorMessage={formik.errors.email}
            classNames={itemClasses}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            id="password"
            name="password"
            type={isPasswordVisible ? 'text' : 'password'}
            label="Пароль (не менее 6 знаков)"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Придумайте пароль"
            isInvalid={Boolean(formik.errors.password)}
            errorMessage={formik.errors.password}
            endContent={
              <button onClick={toggleVisibility} type="button">
                {isPasswordVisible ? (
                  <img width="20" height="20" src="./eye-hide.svg" />
                ) : (
                  <img width="20" height="20" src="./eye-show.svg" />
                )}
              </button>
            }
            classNames={itemClasses}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            id="repeatPassword"
            name="repeatPassword"
            type={isConfirmVisible ? 'text' : 'password'}
            label="Пароль (не менее 6 знаков)"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            placeholder="Придумайте пароль"
            isInvalid={Boolean(formik.errors.repeatPassword)}
            errorMessage={formik.errors.repeatPassword}
            endContent={
              <button onClick={toggleConfirmVisible} type="button">
                {isConfirmVisible ? (
                  <img width="20" height="20" src="./eye-hide.svg" />
                ) : (
                  <img width="20" height="20" src="./eye-show.svg" />
                )}
              </button>
            }
            classNames={itemClasses}
          />
        </div>
        <p>Укажите данные компании</p>
        <div className={styles.inputContainer}>
          <Input
            id="inn"
            name="inn"
            type="number"
            label="ИНН"
            value={formik.values.inn ? formik.values.inn.toString() : undefined}
            onChange={formik.handleChange}
            placeholder="ИНН"
            isInvalid={Boolean(formik.errors.inn)}
            errorMessage={formik.errors.inn}
            classNames={itemClasses}
          />
        </div>
        <p>Укажите контактное лицо</p>
        <div className={styles.inputContainer}>
          <Input
            id="lastName"
            name="lastName"
            label="Фамилия"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            placeholder="Фамилия"
            isInvalid={Boolean(formik.errors.lastName)}
            errorMessage={formik.errors.lastName}
            classNames={itemClasses}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            id="firstName"
            name="firstName"
            label="Имя"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            placeholder="Имя"
            isInvalid={Boolean(formik.errors.firstName)}
            errorMessage={formik.errors.firstName}
            classNames={itemClasses}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            id="middleName"
            name="middleName"
            label="Отчество"
            type="text"
            value={formik.values.middleName}
            onChange={formik.handleChange}
            placeholder="Отчество"
            isInvalid={Boolean(formik.errors.middleName)}
            errorMessage={formik.errors.middleName}
            classNames={itemClasses}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            id="phone"
            name="phone"
            label="Телефон"
            type="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="Фамилия"
            isInvalid={Boolean(formik.errors.phone)}
            errorMessage={formik.errors.phone}
            classNames={itemClasses}
          />
        </div>
        <input type="submit" value="Зарегистрироваться" />
      </form>
    </div>
  );
};
