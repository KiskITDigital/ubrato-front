/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Ref, useEffect, useRef, useState } from 'react';
import styles from './settings-page.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox, Input } from '@nextui-org/react';
// import { LoginFormValuesT } from "@/types/app";
// import { useFormik } from "formik";
import {
  askForVerification,
  askResetPassword,
  changePersonalData,
  login,
  updateToken,
} from '@/api';
// import { loginSchema } from '@/validation/loginSchema';
// import { AxiosError } from "axios";
import { useUserInfoStore } from '@/store/userInfoStore';
import { AxiosError } from 'axios';
import Modal from '@/components/Modal';
import ContactModal from '@/components/Modal/ContactModal';
import { useIMask } from 'react-imask';

const SettingsPage: FC = () => {
  const navigate = useNavigate();

  const startRef = useRef<HTMLHeadingElement>(null);

  const userInfoStore = useUserInfoStore();

  const { ref, value, setValue } = useIMask({ mask: '+{7}(900)000-00-00' });

  const status: 'unverified' | 'success' = userInfoStore.user.verified ? 'success' : 'unverified';

  const [buttonText, setButtonText] = useState<
    'Отправить письмо' | 'Ссылка для подтверждения e-mail отправлена на указанную вами почту.'
  >('Отправить письмо');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [wantToChange, setWantToChange] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [hasDataChanged, setHasDataChanged] = useState(false);
  const [changeDataError, setChangeDataError] = useState('');
  const [contactConfirm, setContactConfirm] = useState(false);
  const [contactError, setContactError] = useState('');

  const [passwordToChange, setPasswordToChange] = useState('');
  const [isPasswordToChangeVisible, setIsPasswordToChangeVisible] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<
    | ''
    | 'Пароль некорректен'
    | 'allowed'
    | 'На указанную вами электронную почту отправлена ссылка для создания нового пароля.'
  >('');

  // const initialValues: LoginFormValuesT = {
  //     email: userInfoStore.user.email,
  //     password: '',
  // };

  // const formik = useFormik<LoginFormValuesT>({
  //     initialValues: initialValues,
  //     onSubmit() { },
  //     validationSchema: loginSchema,
  // });

  const handleVerifyPassword = async (value: string) => {
    try {
      const res = await login({ email: userInfoStore.user.email, password: value });
      if (res.status === 200) {
        setIsVerified(true);
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          setVerifyError('Пароль некорректен');
        } else {
          setVerifyError('Что-то пошло не так');
        }
      }
    }
  };

  const handlePassword = async (newVal: string) => {
    setPassword(newVal);
    setPassword(newVal);
    // if (password.length > 0 && password.length < 6) setPasswordError("Пароль слишком короткий")
    // else setPasswordError("")
    if (newVal.length > 0) {
      try {
        await login({ email: userInfoStore.user.email, password: newVal });
        setPasswordError('allowed');
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 401) {
            setPasswordError('Пароль некорректен');
          } else {
            setErrorMsg('Что-то пошло не так');
          }
        }
      }
    } else setPasswordError('');
  };

  const verification = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await askForVerification(token);
      setButtonText('Ссылка для подтверждения e-mail отправлена на указанную вами почту.');
      setTimeout(() => {
        setButtonText('Отправить письмо');
      }, 3000);
    } catch (e) {
      navigate('/login');
    }
  };

  useEffect(() => {
    setValue(userInfoStore.user.phone);
    setFirstName(userInfoStore.user.first_name);
    setLastName(userInfoStore.user.last_name);
    setMiddleName(userInfoStore.user.middle_name);
  }, []);

  useEffect(() => {
    if (
      userInfoStore.user.first_name === firstName &&
      userInfoStore.user.last_name === lastName &&
      userInfoStore.user.middle_name === middleName &&
      userInfoStore.user.phone === value.replaceAll('-', '').replaceAll('(', '').replaceAll(')', '')
    ) {
      setHasDataChanged(false);
    } else {
      setHasDataChanged(true);
    }
  }, [firstName, lastName, middleName, value]);

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 200, behavior: 'smooth' });
    }, 0);

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const askToResetPassword = async () => {
    const { status } = await askResetPassword(userInfoStore.user.email);
    if (status) {
      setPassword('');
      setPasswordError(
        'На указанную вами электронную почту отправлена ссылка для создания нового пароля.'
      );
      setTimeout(() => {
        setPasswordError('');
      }, 3000);
    }
  };

  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  const itemClasses = {
    input: styles.input,
    innerWrapper: styles.innerWrapper,
    base: styles.base,
    label: styles.label,
    errorMessage: styles.errorMessage,
    helperWrapper: styles.helperWrapper,
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <section ref={startRef} className={`${styles.container}`}>
      <p className={styles.title}>Настройки аккаунта</p>
      <div className="flex gap-10 border-b border-black/30 pb-6">
        <p className="min-w-[220px] font-bold">Статус</p>
        <div className={`${styles.section__container} ${styles.section__containerStatus}`}>
          {/* <p className={`${styles.status} ${status === 'success' ? styles.statusSuccess : styles.statusUnSuccess}`}>{status === 'success' ? 'Верифицирован' : status === 'blocked' ? 'Заблокирован' : 'Подтвердите почту'}</p> */}
          <p
            className={`${styles.status} ${
              status === 'success' ? styles.statusSuccess : styles.statusUnSuccess
            }`}
          >
            {status === 'success' ? 'Верифицирован' : 'Подтвердите почту'}
          </p>
          {status === 'unverified' && (
            <div className={styles.statusVerifyBlock}>
              <button
                onClick={() => verification()}
                className={`${styles.sendMessage}`}
                disabled={
                  buttonText ===
                  'Ссылка для подтверждения e-mail отправлена на указанную вами почту.'
                }
              >
                {buttonText}
              </button>
              {buttonText !==
                'Ссылка для подтверждения e-mail отправлена на указанную вами почту.' && (
                <div className={styles.info}>
                  <img className={styles.info__img} src="/info-ic.svg" alt="i" />
                  <p className={styles.info__text}>
                    Чтобы начать работу с тендерами пройдите верификацию
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between border-b border-black/30 pb-6">
        <p className="min-w-[220px] font-bold">Пользовательские данные</p>
        <div className={styles.section__container}>
          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__name}>Email</p>
            {/* <input className={styles.inputBlock__input} type="text" /> */}
            <Input
              id="email"
              name="email"
              type="email"
              readOnly={true}
              maxLength={250}
              value={userInfoStore.user.email}
              variant="bordered"
              placeholder="Электронная почта"
              classNames={itemClasses}
              onFocus={() => {
                setErrorMsg('');
              }}
            />
          </div>
          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__name}>Пароль</p>
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              maxLength={250}
              value={password}
              onChange={(e) => handlePassword(e.currentTarget.value)}
              placeholder="Введите пароль"
              endContent={
                <button onClick={() => setIsPasswordVisible((prev) => !prev)} type="button">
                  {isPasswordVisible ? (
                    <img width="20" height="20" src="/eye-hide.svg" />
                  ) : (
                    <img width="20" height="20" src="/eye-show.svg" />
                  )}
                </button>
              }
              classNames={itemClasses}
              onFocus={() => {
                setErrorMsg('');
              }}
            />
            {passwordError !== 'allowed' &&
              passwordError !==
                'На указанную вами электронную почту отправлена ссылка для создания нового пароля.' && (
                <p className={styles.errorMessage}>{passwordError}</p>
              )}
          </div>
          <Checkbox
            id="confirm"
            name="confirm"
            isSelected={passwordConfirm}
            onValueChange={(e) => {
              setPasswordConfirm(e);
              setPasswordResetError('');
            }}
            classNames={checkStyle}
          >
            <p className="text-sm max-w-[500px]">
              Я даю{' '}
              <Link className={styles.link} target="_blank" to="/rights?document=1">
                Согласие на обработку персональных данных
              </Link>{' '}
              в соответствии с{' '}
              <Link className={styles.link} target="_blank" to="/rights?document=3">
                Политикой в отношении обработки персональных данных
              </Link>
              <span>.</span>
            </p>
            <p className={`${styles.errorMessage} ${styles.checkErr}`}>{passwordResetError}</p>
          </Checkbox>
          <button
            disabled={passwordError !== 'allowed'}
            className={styles.updateAccaunt}
            onClick={() => {
              if (passwordConfirm) {
                askToResetPassword();
              } else {
                setPasswordResetError('Обязательное поле');
              }
            }}
          >
            {passwordError ===
            'На указанную вами электронную почту отправлена ссылка для создания нового пароля.'
              ? 'На указанную вами электронную почту отправлена ссылка для создания нового пароля.'
              : 'Изменить'}
          </button>
          {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
        </div>
      </div>
      <div className="flex justify-between border-b border-black/30 pb-6 relative">
        <p className="min-w-[220px] font-bold">Контактное лицо</p>
        <div className={styles.section__container}>
          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__name}>Фамилия</p>
            <Input
              type="text"
              value={lastName}
              variant="bordered"
              placeholder="Фамилия"
              classNames={itemClasses}
              onValueChange={(e) => {
                setLastName(e);
                setChangeDataError('');
              }}
            />
          </div>
          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__name}>Имя</p>
            <Input
              type="text"
              value={firstName}
              placeholder="Имя"
              classNames={itemClasses}
              onValueChange={(e) => {
                setFirstName(e);
                setChangeDataError('');
              }}
            />
          </div>
          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__name}>Отчество</p>
            <Input
              onValueChange={(e) => {
                setMiddleName(e);
                setChangeDataError('');
              }}
              type="text"
              value={middleName}
              placeholder="Отчество"
              classNames={itemClasses}
            />
          </div>
          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__name}>Телефон</p>
            <Input
              ref={ref as Ref<HTMLInputElement>}
              id="phone"
              name="phone"
              type="phone"
              value={value}
              placeholder="Телефон"
              onChange={() => setChangeDataError('')}
              classNames={itemClasses}
            />
          </div>
          <Checkbox
            id="confirm"
            name="confirm"
            isSelected={contactConfirm}
            onValueChange={(e) => {
              setContactConfirm(e);
              setChangeDataError('');
            }}
            classNames={checkStyle}
          >
            <p className="text-sm max-w-[500px]">
              Я даю{' '}
              <Link className={styles.link} target="_blank" to="/rights?document=1">
                Согласие на обработку персональных данных
              </Link>{' '}
              в соответствии с{' '}
              <Link className={styles.link} target="_blank" to="/rights?document=3">
                Политикой в отношении обработки персональных данных
              </Link>
              <span>.</span>
            </p>
            <p className={`${styles.errorMessage} ${styles.checkErr}`}>{contactError}</p>
          </Checkbox>
          {!wantToChange && (
            <button
              className={styles.updateAccaunt}
              onClick={() => {
                setWantToChange(true);
              }}
            >
              Изменить
            </button>
          )}
          {(wantToChange || isVerified) &&
            (hasDataChanged === true ? (
              <div className="flex gap-[10px] relative">
                <button
                  className={styles.filledBtn}
                  onClick={() => {
                    if (!contactConfirm) {
                      setContactError('Обязательное поле');
                      return;
                    }
                    const token = localStorage.getItem('token');
                    const parameters = {
                      firstName: firstName,
                      lastName: lastName,
                      middleName: middleName,
                      phone: value,
                    };
                    if (token && firstName && lastName && value) {
                      (async () => {
                        await updateToken<
                          void,
                          { firstName: string; middleName: string; lastName: string; phone: string }
                        >(changePersonalData, parameters);
                        setWantToChange(false);
                        setIsVerified(false);
                      })();
                    } else {
                      setChangeDataError('Заполните все поля');
                    }
                  }}
                >
                  Сохранить
                </button>
                <button
                  className={styles.updateAccaunt}
                  onClick={() => {
                    setWantToChange(false);
                    setIsVerified(false);
                    setFirstName(userInfoStore.user.first_name);
                    setLastName(userInfoStore.user.last_name);
                    setMiddleName(userInfoStore.user.middle_name);
                    setValue(userInfoStore.user.phone);
                  }}
                >
                  Отменить
                </button>
                {changeDataError && <p className={styles.dataErrorMessage}>{changeDataError}</p>}
              </div>
            ) : (
              <div className="flex gap-[10px]">
                <button
                  className={styles.updateAccaunt}
                  onClick={() => {
                    setWantToChange(false);
                    setIsVerified(false);
                  }}
                >
                  Закрыть
                </button>
              </div>
            ))}
        </div>
        {wantToChange && !isVerified && (
          <div className="flex items-center justify-center mt-[-20px] ml-[-20px] p-[20px] absolute w-full h-full backdrop-blur box-content">
            <div className="bg-white w-[310px] h-[175px] p-[20px] rounded-[20px] flex flex-col justify-between items-start relative">
              <button
                className="rounded-full bg-[rgba(0,0,0,.04)] w-[20px] h-[20px] flex items-center justify-center absolute top-[10px] right-[10px]"
                onClick={() => setWantToChange(false)}
              >
                <img className="w-[10px] h-[10px]" src="/x-icon.svg" alt="close" />
              </button>
              <p className="text-[16px] font-bold">Введите пароль</p>
              <Input
                type={isPasswordToChangeVisible ? 'text' : 'password'}
                maxLength={250}
                value={passwordToChange}
                onChange={(e) => setPasswordToChange(e.currentTarget.value)}
                placeholder="Введите пароль"
                endContent={
                  <button
                    onClick={() => setIsPasswordToChangeVisible((prev) => !prev)}
                    type="button"
                  >
                    {isPasswordToChangeVisible ? (
                      <img width="20" height="20" src="/eye-hide.svg" />
                    ) : (
                      <img width="20" height="20" src="/eye-show.svg" />
                    )}
                  </button>
                }
                classNames={{ ...itemClasses, base: styles.base2 }}
              />
              <div className="relative">
                <button
                  className="bg-accent text-white text-[16px] font-medium px-[18px] py-[12px] rounded-[13px]"
                  onClick={() => {
                    (async () => {
                      await handleVerifyPassword(passwordToChange);
                      setPasswordToChange('');
                    })();
                  }}
                >
                  Подтвердить
                </button>
                {verifyError && (
                  <p className="absolute w-[150px] text-[10px] left-[5px] bottom-[-15px] text-red-600">
                    {verifyError}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between border-b border-black/30 pb-6">
        <p className="min-w-[220px] font-bold">Правовые документы</p>
        <div className={styles.section__container}>
          <Link target="_blank" to="/rights?document=1" className={styles.sectionLink}>
            Политика обработки персональных данных
          </Link>
          <Link target="_blank" to="/rights?document=2" className={styles.sectionLink}>
            Пользовательское соглашение
          </Link>
          <Link target="_blank" to="/rights?document=3" className={styles.sectionLink}>
            Согласие на обработку персональных данных
          </Link>
        </div>
      </div>
      <div className="flex justify-between border-b border-black/30 pb-6">
        <p className="min-w-[220px] font-bold">Обратная связь</p>
        <div className={styles.section__container}>
          <p className={styles.sectionText}>
            Есть вопросы по настройке аккаунта?{' '}
            <span
              className={`${styles.sectionLink} cursor-pointer`}
              onClick={() => setOpenModal(true)}
            >
              Напишите телефон
            </span>{' '}
            и мы перезвоним
          </p>
        </div>
      </div>
      {/* {status !== 'blocked' && <button className={styles.deleteAccaunt}>Удалить аккаунт</button>} */}
      <button className={styles.deleteAccaunt}>Удалить аккаунт</button>
      <Modal isOpen={openModal}>
        <ContactModal onClose={() => setOpenModal(false)} />
      </Modal>
    </section>
  );
};

export default SettingsPage;
