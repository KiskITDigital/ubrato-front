/* eslint-disable react-hooks/exhaustive-deps */
import { askResetPassword } from '@/api';
import { forgotPasswordSchema } from '@/validation/resetPasswordSchema';
import { Input } from '@nextui-org/react';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface forgotPasswordFormValuesT {
  email: string;
}

export const ForgotPassword: FC = () => {
  const initialValues: forgotPasswordFormValuesT = {
    email: '',
  };

  const navigate = useNavigate();

  const [messageSent, setMessageSent] = useState(false);

  const formik = useFormik<forgotPasswordFormValuesT>({
    initialValues: initialValues,
    onSubmit(values) {
      (async () => {
        try {
          const res = await askResetPassword(values.email);
          console.log(res);
          if (res.status === 200) {
            document.body.style.overflow = 'hidden';
            setMessageSent(true);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error);
            if (error.status === 404) {
              formik.setErrors({
                email: 'Пользователь с таким адресом электронной почты не найден',
              });
            }
          }
        }
      })();
    },
    validationSchema: forgotPasswordSchema,
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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="container flex items-center justify-center h-[calc(100vh-110px)]">
      <div className="w-[478px] flex flex-col gap-11">
        <h1 className="text-[28px] font-semibold">Восстановление пароля</h1>
        <p className="text-lg font-semibold">
          Забыли пароль?{' '}
          <span className="text-[#666]">
            Введите адрес электронной почты, чтобы подтвердить действие и сбросить пароль
          </span>
        </p>
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Введите пароль"
            isInvalid={Boolean(formik.errors.email)}
            errorMessage={formik.errors.email}
            classNames={inputClasses}
          />
          <div className="flex gap-9">
            <input
              className="px-4 py-3 rounded-xl bg-accent text-white text-lg font-semibold"
              type="submit"
              value="Отправить"
            />
            <button className="px-4 py-3 rounded-xl bg-[#F4F7F9] text-[#666] text-lg font-semibold">
              Отменить
            </button>
          </div>
        </form>
        {messageSent && (
          <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-10 backdrop-blur-[20px] bg-[rgba(0,0,0,.2)] flex justify-center items-center">
            <div className="bg-white rounded-[20px] p-5 flex flex-col gap-9">
              <h2 className="text-[26px]">Письмо отправлено</h2>
              <div className="flex gap-[10px] py-3 px-[14px] bg-[rgba(0,0,0,.03)] rounded-[14px]">
                <img src="info-blue-ic.svg" alt="icon" className="w-[16px] h-[16px]" />
                <p className="w-[523px] font-medium text-lg leading-5">
                  На указанную вами почту было отправлено письмо с ссылкой для восстановления
                  пароля, перейдите по ней для подтверждения действия
                </p>
              </div>
              <button
                onClick={() => {
                  document.body.style.overflow = 'auto';
                  navigate('/');
                }}
                className="w-[200px] rounded-[17px] bg-accent text-white self-center p-3 text-lg font-bold"
              >
                Хорошо
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
