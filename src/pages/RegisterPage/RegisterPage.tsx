import { useFormik } from 'formik';
import { ChangeEvent, FC, FormEvent, Ref, useEffect, useState } from 'react';
import { RegisterFormValuesT } from '@/types/app';
import { Checkbox, Input } from '@nextui-org/react';
import { registerSchema } from '@/validation/registerSchema';
import styles from './registerpage.module.css';
import { useUserInfoStore } from '@/store/userInfoStore';
import { Link, useNavigate } from 'react-router-dom';
import { checkINN, registerUser } from '@/api';
import { useIMask } from 'react-imask';

export const RegisterPage: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userInfoStore = useUserInfoStore();
  const navigate = useNavigate();
  const fetchUser = userInfoStore.fetchUser;

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
    personalDataApproval: false,
    callsRecievApproval: false,
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
        avatar: '',
      };
      (async () => {
        setIsLoading(true);
        try {
          await registerUser(parameters);

          const token = localStorage.getItem('token');
          if (token) {
            await fetchUser(token);
            if (!userInfoStore.error) {
              navigate('/profile');
            }
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
  const [companyName, setCompanyName] = useState('');
  // const [nameConfirm, setNameConfirm] = useState(false);

  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  // const phoneRef = useRef(null);

  const { ref, value } = useIMask({ mask: '+{7}(900)000-00-00' });

  useEffect(() => {
    if (userInfoStore.isLoggedIn) {
      navigate('/profile');
    }
  }, [navigate, userInfoStore.isLoggedIn]);

  if (userInfoStore.isLoggedIn) {
    return <div></div>;
  }

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>Регистрация на сайте Ubrato</h1>
        <div className={styles.createInfo}>
          <p className={styles.create}>Выберите Вашу роль</p>
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
            {isContractor
              ? 'Если ваша компания выполняет заказы, то добавьте функционал исполнителя. Или выберите эту роль позже.'
              : 'Регистрируясь на сайте Ubrato, ваша компания получает возможность проводить тендеры.'}
          </p>
        </div>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
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
                if (e.nativeEvent instanceof InputEvent) {
                  console.log(e.target.value);
                  if (formik.values.inn.length >= 10 && e.nativeEvent.data) {
                    return;
                  }
                  if (e.target.value.length === 10) {
                    (async () => {
                      setCompanyName(await checkINN(e.target.value));
                    })();
                  }
                  if (e.nativeEvent.data?.match(/[\d]/) || !e.nativeEvent.data) {
                    formik.handleChange(e);
                  }
                }
              }}
              placeholder="ИНН"
              isInvalid={Boolean(formik.errors.inn)}
              errorMessage={formik.errors.inn}
              classNames={itemClasses}
            />
            <div className={styles.companyName}>
              <p className={`${styles.label} ${styles.companyText}`}>
                Это название вашей компании?
              </p>
              <p className={`${styles.label} ${styles.companyText}`}>Краткое название компании</p>
              <p className={styles.nameConfirm}>{companyName}</p>
              <div className={styles.companyBtns}>
                <button type="button">Да</button>
                <button
                  type="button"
                  onClick={() => {
                    // setNameConfirm(false);
                    formik.values.inn = '';
                    setCompanyName('');
                  }}
                >
                  Нет
                </button>
              </div>
            </div>
          </div>
          <p className={styles.infoText}>
            В настоящее время сервис Ubrato открыт для юридических лиц
          </p>
          <p className={styles.inputGrHeader}>Укажите контактное лицо</p>
          <p className={`${styles.infoText} ${styles.weCall}`}>
            Мы свяжемся с Вами для верификации данных
          </p>
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
          {/* <IMaskInput ref={ref}></IMaskInput> */}
          <div className={styles.inputContainer}>
            <Input
              ref={ref as Ref<HTMLInputElement>}
              id="phone"
              name="phone"
              label="Телефон"
              type="phone"
              value={value}
              onInput={(e: FormEvent<HTMLInputElement>) => {
                formik.handleChange(e);
              }}
              placeholder="Телефон"
              isInvalid={Boolean(formik.errors.phone)}
              errorMessage={formik.errors.phone}
              classNames={itemClasses}
            />
          </div>
          <div className={styles.approvalContainer}>
            <Checkbox
              id="personalDataApproval"
              name="personalDataApproval"
              isSelected={formik.values.personalDataApproval}
              onChange={formik.handleChange}
              classNames={checkStyle}
            >
              Согласие на передачу и обработку данных, согласно с{' '}
              <Link className={styles.link} to="/">
                условиями
              </Link>{' '}
              пользования сайтом
              <p className={`${styles.errorMessage} ${styles.checkErr}`}>
                {formik.errors.personalDataApproval}
              </p>
            </Checkbox>

            <Checkbox
              id="callsRecievApproval"
              name="callsRecievApproval"
              isSelected={formik.values.callsRecievApproval}
              onChange={formik.handleChange}
              classNames={checkStyle}
            >
              Соглашаюсь получать маркетинговые звонки и смс от ООО «Интеграция»
            </Checkbox>
          </div>
          <div className={styles.submitContainer}>
            <input
              disabled={isLoading}
              className={styles.submit}
              type="submit"
              value="Зарегистрироваться"
            />
          </div>
          <div className={`${styles.questionsAboutRegistration} ${styles.stillHaveQuestions}`}>
            Есть вопросы по регистрации?{' '}
            <Link to="/" className={styles.link}>
              Напишите телефон
            </Link>{' '}
            и мы перезвоним
          </div>
        </form>
      </div>
    </div>
  );
};
