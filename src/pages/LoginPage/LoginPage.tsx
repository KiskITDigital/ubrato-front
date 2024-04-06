import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { LoginFormValuesT } from '@/types/app';
import axios, { AxiosError } from 'axios';
import styles from './loginpage.module.css';
import { Input } from '@nextui-org/react';
import { useUserInfoStore } from '@/store/userInfoStore';
import { loginSchema } from '@/validation/loginSchema';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api';

axios.defaults.withCredentials = true;

export const LoginPage: FC = () => {
  const initialValues: LoginFormValuesT = {
    email: '',
    password: '',
  };

  const [errorMsg, setErrorMsg] = useState('');

  const userInfoStore = useUserInfoStore();
  const navigate = useNavigate();

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
          await login(parameters);
          const token = localStorage.getItem('token');
          if (token) {
            await userInfoStore.fetchUser(token);
            if (!userInfoStore.error) {
              navigate('/profile');
            }
          }
        } catch (e) {
          console.log(e, '1');
          if (e instanceof AxiosError) {
            if (e.response?.status === 401) {
              setErrorMsg('Неверный пароль');
            } else if (e.response?.status === 404) {
              setErrorMsg('Пользователя с таким e-mail не существует');
            } else {
              setErrorMsg('Что-то пошло не так');
            }
          }
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

  useEffect(() => {
    if (userInfoStore.isLoggedIn) {
      navigate('/profile');
    }
  }, [navigate, userInfoStore.isLoggedIn]);

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
              onFocus={() => {
                setErrorMsg('');
              }}
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              id="password"
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              label="Пароль"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Введите пароль"
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
              onFocus={() => {
                setErrorMsg('');
              }}
            />
          </div>
          <div className={styles.submitContainer}>
            <input disabled={isLoading} className={styles.submit} type="submit" value="Войти" />
            {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};
