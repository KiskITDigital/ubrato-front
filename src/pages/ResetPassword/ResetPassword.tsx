/* eslint-disable react-hooks/exhaustive-deps */
import { resetPassword } from '@/api';
import { useUserInfoStore } from '@/store/userInfoStore';
import { resetPasswordSchema } from '@/validation/resetPasswordSchema';
import { Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface resetPasswordFormValuesT {
  password: string;
  confirmPassword: string;
}

export const ResetPassword: FC = () => {
  const initialValues: resetPasswordFormValuesT = {
    password: '',
    confirmPassword: '',
  };

  const userStore = useUserInfoStore();

  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik<resetPasswordFormValuesT>({
    initialValues: initialValues,
    onSubmit(values) {
      const code = location.search.split('?code=')[1].split('&email=')[0];
      const email = location.search.split('&email=')[1];

      (async () => {
        const res = await resetPassword(email.replace('%40', '@'), code, values.password);
        if (res.status === 200) {
          localStorage.removeItem('token');
          userStore.setLoggedIn(false);
          navigate('/');
        } else {
          setErrorMsg('Что-то пошло не так');
        }
      })();
    },
    validationSchema: resetPasswordSchema,
  });

  const inputClasses = {
    input: 'text-xl outline-none',
    innerWrapper:
      'h-[50px] w-[476px] px-2 py-1 rounded-xl border-solid border-[1px] border-[rgba(0,0,0,.1)] group-data-[invalid=true]:border-error flex',
    base: 'mt-[40px] relative pb-9',
    label: 'absolute top-[-30px] font-medium text-lg text-[#666] z-1',
    errorMessage: 'text-error text-xs font-medium',
    helperWrapper: 'block self-end absolute bottom-[18px]',
    inputWrapper: 'p-0',
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (location.search.length === 0) {
      navigate('/login');
    }
  }, [location.search.length]);

  if (location.search.length === 0) return <div></div>;

  return (
    <div className="container flex flex-col items-center">
      <div className="flex flex-col justify-center h-[calc(100vh-110px)]">
        <h1 className="text-[24px] font-semibold">Изменить пароль</h1>
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="password"
            name="password"
            type={isPasswordVisible ? 'text' : 'password'}
            label="Новый пароль*"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Введите пароль"
            isInvalid={Boolean(formik.errors.password)}
            errorMessage={formik.errors.password}
            classNames={inputClasses}
            endContent={
              <button
                onClick={() => {
                  setIsPasswordVisible(!isPasswordVisible);
                }}
                type="button"
              >
                {isPasswordVisible ? (
                  <img width="20" height="20" src="./eye-hide.svg" />
                ) : (
                  <img width="20" height="20" src="./eye-show.svg" />
                )}
              </button>
            }
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={isPasswordVisible ? 'text' : 'password'}
            label="Повторите пароль*"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder="Повторите пароль"
            isInvalid={Boolean(formik.errors.confirmPassword)}
            errorMessage={formik.errors.confirmPassword}
            classNames={inputClasses}
            endContent={
              <button
                onClick={() => {
                  setIsConfirmVisible(!isConfirmVisible);
                }}
                type="button"
              >
                {isConfirmVisible ? (
                  <img width="20" height="20" src="./eye-hide.svg" />
                ) : (
                  <img width="20" height="20" src="./eye-show.svg" />
                )}
              </button>
            }
          />
          <div className="flex gap-9">
            <input
              className="px-4 py-3 rounded-xl bg-accent text-white text-lg font-semibold"
              type="submit"
              value="Сохранить"
            />
            <button className="px-4 py-3 rounded-xl bg-[#F4F7F9] text-[#666] text-lg font-semibold">
              Отменить
            </button>
          </div>
        </form>
        {errorMsg && <p className="text-error text-center">{errorMsg}</p>}
      </div>
    </div>
  );
};
