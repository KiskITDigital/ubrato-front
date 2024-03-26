import { useFormik } from 'formik';
import { ChangeEvent, FC, useState } from 'react';
import { RegisterFormValuesT } from '@/types/app';
import { Input } from '@nextui-org/react';
import { registerSchema } from '@/validation/registerSchema';
import styles from './registerpage.module.css';
import { axiosInstance } from '@/utils';
import { useUserInfoStore } from '@/store/userInfoStore';
import { Link } from 'react-router-dom';

export const RegisterPage: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userInfoStore = useUserInfoStore();

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmVisible = () => setIsConfirmVisible(!isConfirmVisible);

  const initialValues: RegisterFormValuesT = {
    inn: '',
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
        inn: values.inn,
        is_contractor: isContractor,
      };
      (async () => {
        setIsLoading(true);
        try {
          const res = await axiosInstance.post(`/v1/auth/signup`, parameters);
          console.log(res);
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
    validationSchema: registerSchema,
    validateOnBlur: false,
    validateOnMount: false,
  });

  const [isContractor, setIsContractor] = useState(false);

  // const checkStyle = {
  //   base: styles.checkBase,
  //   icon: styles.checkIcon,
  //   wrapper: styles.checkWrapper,
  // };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Регистрация на сайте</h1>
        {/* <p>Я - заказчик</p>
      <Checkbox defaultSelected classNames={checkStyle} isDisabled />
      <p>Я - исполнитель</p>
        <Checkbox
          classNames={checkStyle}
          isSelected={isContractor}
          onValueChange={setIsContractor}
        /> */}
        <div className={styles.createInfo}>
          <p className={styles.create}>Создайте учетную запись</p>
          <img className={styles.info} src="./info-ic.svg" alt="info" />
        </div>
        <div className={styles.buttonsContainer}>
          <button className={`${styles.button} ${styles.active}`} disabled>
            Вы заказчик
          </button>
          <button
            className={`${styles.button} ${isContractor ? styles.active : ''}`}
            onClick={() => {
              setIsContractor(!isContractor);
            }}
          >
            Вы исполнитель
          </button>
        </div>
        <div className={styles.questionsAboutRegistrationContainer}>
          <p className={styles.questionsAboutRegistration}>
            Есть вопросы по регистрации?{' '}
            <Link to="/" className={styles.phoneLink}>
              Напишите телефон
            </Link>{' '}
            и мы перезвоним
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <p className={styles.inputGrHeader}>Создайте учетную запись</p>
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
          <p className={styles.inputGrHeader}>Укажите данные компании</p>
          <div className={styles.inputContainer}>
            <Input
              id="inn"
              name="inn"
              type="text"
              label="ИНН"
              value={formik.values.inn}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                console.log(formik.values.inn);
                if (e.nativeEvent instanceof InputEvent) {
                  if (formik.values.inn.length >= 10 && e.nativeEvent.data) {
                    return;
                  }
                  if (e.nativeEvent.data?.match(/[\d]/) || !e.nativeEvent.data) {
                    formik.handleChange(e);
                  }
                }

                // console.log(e.nativeEvent);

                // console.log(formik.values.inn);
              }}
              placeholder="ИНН"
              isInvalid={Boolean(formik.errors.inn)}
              errorMessage={formik.errors.inn}
              classNames={itemClasses}
            />
          </div>
          <p className={styles.inputGrHeader}>Укажите контактное лицо</p>
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
          <div className={styles.submitContainer}>
            <input
              disabled={isLoading}
              className={styles.submit}
              type="submit"
              value="Зарегистрироваться"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
