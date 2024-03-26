import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { LoginFormValuesT } from '../../types/app';
import axios from 'axios';
import { SERVER_URI } from '../../utils/serverURI';
import styles from './loginpage.module.css';
import { Input } from '@nextui-org/react';
import { useUserInfoStore } from '../../store/userInfoStore';
import { loginSchema } from '../../validation/loginSchema';
axios.defaults.withCredentials = true;

export const LoginPage: FC = () => {
  const initialValues: LoginFormValuesT = {
    email: '',
    password: '',
  };

  const userInfoStore = useUserInfoStore();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const formik = useFormik<LoginFormValuesT>({
    initialValues: initialValues,
    onSubmit(values) {
      console.log(values);
      const parameters = {
        email: values.email,
        password: values.password,
      };
      (async () => {
        setIsLoading(true);
        try {
          const res = await axios.post(`${SERVER_URI}/v1/auth/signin`, parameters);
          console.log(res);
          localStorage.setItem('token', res.data.access_token);
          const token = localStorage.getItem('token');
          if (token) {
            userInfoStore.fetchUser(token);
          }
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      })();
    },
    validationSchema: loginSchema,
  });

  const itemClasses = {
    input: styles.input,
    innerWrapper: styles.innerWrapper,
    base: styles.base,
    label: styles.label,
    errorMessage: styles.errorMessage,
    helperWrapper: styles.helperWrapper,
  };

  return (
    <div className={`container ${styles.container}`}>
      <div>
        <h1 className={styles.header}>Вход</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputContainer}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Логин (Email)"
              value={formik.values.email}
              onChange={formik.handleChange}
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
          <div className={styles.submitContainer}>
            <input disabled={isLoading} className={styles.submit} type="submit" value="Войти" />
          </div>
        </form>
      </div>
    </div>
  );
};
