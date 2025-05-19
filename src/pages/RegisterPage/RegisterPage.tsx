/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import {
  ChangeEvent,
  FC,
  FormEvent,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import { RegisterFormValuesT } from "@/types/app";
import { Checkbox, Input } from "@nextui-org/react";
import { registerSchema } from "@/validation/registerSchema";
import styles from "./registerpage.module.css";
import { useUserInfoStore } from "@/store/userInfoStore";
import { Link, useNavigate } from "react-router-dom";
import { checkINN, registerUser } from "@/api";
import { useIMask } from "react-imask";
import Modal from "@/components/Modal";
import toast, { Toaster } from "react-hot-toast";
import InfoModal from "@/components/Modal/InfoModal";
import { checkEmailRegistrationStatus } from "@/api/register/checkEmailRegistrationStatus";
import { checkINNRegistrationStatus } from "@/api/register/checkINNRegistrationStatus";

export const RegisterPage: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userInfoStore = useUserInfoStore();
  const navigate = useNavigate();
  const fetchUser = userInfoStore.fetchUser;

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmVisible = () => setIsConfirmVisible(!isConfirmVisible);

  const initialValues: RegisterFormValuesT = {
    inn: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    middleName: "",
    personalDataAgreement: false,
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
    onSubmit(values) {
      const parameters = {
        email: values.email,
        phone: values.phone,
        password: values.password,
        first_name: values.firstName,
        middle_name: values.middleName,
        last_name: values.lastName,
        inn: values.inn,
        is_contractor: isContractor,
        avatar: "",
      };
      (async () => {
        setIsLoading(true);
        try {
          await registerUser(parameters);
          const token = localStorage.getItem("token");
          if (token) {
            await fetchUser(token);
            setOpenModal(true);
          }
        } catch (error: any) {
          toast.error(`${error.response.data.msg}\n${error.response.data.id}`);
        } finally {
          setIsLoading(false);
        }
      })();
    },
    validationSchema: registerSchema,
    validateOnBlur: true,
    validateOnMount: false,
  });

  const [isINNRegistered, setIsINNRegistered] = useState<boolean>(false);
  const [isEmailRegistered, setIsEmailRegistered] = useState<boolean>(false);
  const [isContractor, setIsContractor] = useState(false);
  const [isOrderer, setIsOrderer] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [registrationStep, setRegistrationStep] = useState<1 | 2 | 3 | 4 | 5>(
    1
  );

  const debounceTimer = useRef<number | null>(null);

  const handleEmailCheck = (email: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const exists = await checkEmailRegistrationStatus(email);
        setIsEmailRegistered(exists);
        if (exists) {
          formik.setFieldError("email", "Email уже зарегистрирован");
        }
      } catch (error) {
        console.error("Ошибка проверки email:", error);
      }
    }, 500);
  };

  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  const surnameRef = useRef<HTMLInputElement>(null);

  const scrollTosurnameRef = () => {
    surnameRef.current!.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const elementTop = surnameRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 200, behavior: "smooth" });
    }, 0);
  };

  const { ref, value, setValue } = useIMask({ mask: "+{7}(900)000-00-00" });

  useEffect(() => {
    if (userInfoStore.isLoggedIn) {
      navigate("/profile/documents");
    }
  }, [navigate, userInfoStore.isLoggedIn]);

  useEffect(() => {
    if (
      !formik.errors.email &&
      !formik.errors.password &&
      !formik.errors.repeatPassword &&
      formik.values.email.length !== 0 &&
      formik.values.password.length !== 0 &&
      formik.values.repeatPassword.length !== 0 &&
      registrationStep === 2
    ) {
      setRegistrationStep(3);
    } else if (isOrderer) {
      setRegistrationStep(2);
    } else {
      setRegistrationStep(1);
    }
  }, [
    formik.errors.email,
    formik.errors.password,
    formik.errors.repeatPassword,
    formik.values.email.length,
    formik.values.password.length,
    formik.values.repeatPassword.length,
    isOrderer,
  ]);

  useEffect(() => {
    if (registrationStep === 1 && isOrderer) {
      setRegistrationStep(2);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (userInfoStore.isLoggedIn) {
    return <div></div>;
  }

  return (
    <div className={`container ${styles.container}`}>
      <Toaster position="bottom-right" gutter={8} />
      <div className={styles.formContainer}>
        <h1 className={styles.header}>
          Регистрация на сайте <span className="text-accent">Ubrato</span>
        </h1>
        <p className={`${styles.infoText} pt-[10px]`}>
          Уже есть аккаунт?{" "}
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </p>
        <div className={styles.createInfo}>
          <p className={styles.create}>Выберите Вашу роль</p>
        </div>
        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.button} ${isOrderer ? styles.active : ""}`}
            onClick={() => {
              if (isContractor && isOrderer) {
                setIsOrderer(!isOrderer);
                setIsContractor(!isContractor);
              } else {
                setIsOrderer(!isOrderer);
              }
            }}
          >
            Заказчик
          </button>
          <button
            className={`${styles.button} ${isContractor ? styles.active : ""}`}
            onClick={() => {
              if (isOrderer && !isContractor) {
                setIsContractor(!isContractor);
              } else {
                setIsContractor(!isContractor);
                setIsOrderer(!isOrderer);
              }
            }}
          >
            Исполнитель
          </button>
        </div>
        <div className="flex w-[478px] justify-between mt-[20px]">
          <div className="w-[234px]">
            <p className="text-[rgba(0,0,0)] mb-[10px] text-center text-[13px]">
              Выбирайте роль Заказчика, если вашей компании нужно заказать
              клининг и/или смежные{" "}
              <Link className="underline" to="/faq?page=3&number=2#q3_2">
                услуги
              </Link>
              .
            </p>
            <p className="text-[rgba(0,0,0,.6)] text-center text-[13px]">
              Регистрируясь на сайте <span className="text-accent">Ubrato</span>
              , ваша компания получает возможность проводить тендеры. Если в
              будущем вашей компании потребуется роль Исполнителя, то вы сможете
              подключить этот функционал в личном кабинете.
            </p>
          </div>
          <div className="w-[234px]">
            <p className="text-[rgba(0,0,0)] mb-[10px] text-center text-[13px]">
              Выбирайте роль Исполнителя, если ваша компания предлагает свои
              клининговые и/или смежные{" "}
              <Link className="underline" to="/faq?page=2&number=1#q2_1">
                услуги
              </Link>
              .
            </p>
            <p className="text-[rgba(0,0,0,.6)] text-center text-[13px]">
              Регистрируясь как Исполнитель, ваша компания одновременно
              регистрируется и в роли Заказчика. Это позволит находить
              Исполнителей на субподряды или заказывать специализированные
              услуги для себя.
            </p>
          </div>
        </div>
        <div
          className={`${styles.questionsAboutRegistration} ${styles.stillHaveQuestions}`}
        >
          Есть вопросы по регистрации?{" "}
          <span
            className={`cursor-pointer underline underline-offset-4`}
            onClick={() => {
              setOpenModal(true);
              document.body.style.overflow = "hidden";
            }}
          >
            Напишите телефон
          </span>{" "}
          и мы перезвоним
        </div>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          {registrationStep > 1 && (
            <>
              <p className={styles.inputGrHeader}>Создайте учетную запись</p>
              <div className={styles.inputContainer}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Логин (Email)"
                  value={formik.values.email}
                  onChange={async (e) => {
                    formik.handleChange(e);
                    if (e.target.value.endsWith(" ")) {
                      formik.setErrors({ email: "Некорректный e-mail" });
                    }
                    const email = e.target.value.trim();

                    if (email) {
                      handleEmailCheck(email);
                    } else {
                      setIsEmailRegistered(false);
                      if (debounceTimer.current) {
                        clearTimeout(debounceTimer.current);
                      }
                    }
                  }}
                  variant="bordered"
                  placeholder="Электронная почта"
                  isInvalid={Boolean(formik.errors.email)}
                  errorMessage={formik.errors.email}
                  classNames={itemClasses}
                />
                {isEmailRegistered && (
                  <div>
                    <p className={styles.errorMessage}>
                      Введенный адрес электронной почты уже зарегистрирован в
                      Ubrato.
                    </p>
                    <Link to="/login">
                      <span
                        className={`${styles.blueText} ${styles.text_underline} `}
                      >
                        Войдите на сайт
                      </span>
                    </Link>{" "}
                    <p className={styles.errorMessage}> или </p>
                    <Link to="/forgot-password">
                      <span
                        className={`${styles.blueText} ${styles.text_underline} `}
                      >
                        восстановите пароль.
                      </span>
                    </Link>{" "}
                  </div>
                )}
              </div>
              <div className={styles.inputContainer}>
                <Input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  label="Пароль (не менее 8 знаков, буквы и цифры)"
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
                  type={isConfirmVisible ? "text" : "password"}
                  label="Повторите пароль"
                  value={formik.values.repeatPassword}
                  onChange={formik.handleChange}
                  placeholder="Повторите пароль"
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
            </>
          )}
          {registrationStep > 2 && (
            <>
              <p className={styles.inputGrHeader}>Укажите данные компании</p>
              <p className={`${styles.infoText} py-[10px] w-full max-w-full`}>
                В настоящее время сервис Ubrato открыт для юридических лиц
              </p>
            </>
          )}

          <div className={styles.inputContainer}>
            {registrationStep > 2 && (
              <>
                {" "}
                <Input
                  id="inn"
                  name="inn"
                  type="text"
                  label="ИНН"
                  value={formik.values.inn}
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    if (formik.values.inn.length >= 10 && e.target.value) {
                      e.target.value = e.target.value.slice(0, 10);
                      formik.handleChange(e);
                      return;
                    }

                    if (!(e.target.value?.match(/[\d]/) || !e.target.value)) {
                      return;
                    }

                    formik.handleChange(e);

                    if (e.target.value.length === 10) {
                      try {
                        const res = await checkINN(e.target.value);

                        if (res?.length > 0) {
                          setCompanyName(res);
                          if (registrationStep !== 5) setRegistrationStep(4);

                          const isRegistered = await checkINNRegistrationStatus(
                            e.target.value
                          );
                          setIsINNRegistered(isRegistered);

                          if (isRegistered) {
                            formik.setFieldError(
                              "inn",
                              "Этот ИНН уже зарегистрирован в системе"
                            );
                          } else if (formik.errors.inn) {
                            formik.setErrors({
                              ...formik.errors,
                              inn: undefined,
                            });
                          }
                        } else {
                          toast.error("Неверный ИНН");
                          setRegistrationStep(3);
                          setIsINNRegistered(false);
                        }
                      } catch (error) {
                        console.error("Ошибка проверки ИНН:", error);
                      }
                    } else {
                      setIsINNRegistered(false);
                    }
                  }}
                  placeholder="ИНН"
                  isInvalid={Boolean(formik.errors.inn)}
                  errorMessage={formik.errors.inn}
                  classNames={itemClasses}
                />
                {isINNRegistered && (
                  <div>
                    <p className={styles.errorMessage}>
                      Организация, с введенным значением ИНН уже
                      зарегистрирована в Ubrato.
                    </p>
                    <Link to="/login">
                      <span
                        className={`${styles.blueText} ${styles.text_underline} `}
                      >
                        Войдите на сайт
                      </span>
                    </Link>{" "}
                    <p className={styles.errorMessage}> или </p>
                    <Link to="/forgot-password">
                      <span
                        className={`${styles.blueText} ${styles.text_underline} `}
                      >
                        восстановите пароль.
                      </span>
                    </Link>{" "}
                  </div>
                )}
              </>
            )}
            {registrationStep > 3 && (
              <div className={styles.companyName}>
                <p className={`${styles.label} ${styles.companyText}`}>
                  Это наименование вашей компании?
                </p>
                <p className={`${styles.label} ${styles.companyText}`}>
                  Краткое название компании
                </p>
                <p className={styles.nameConfirm}>{companyName}</p>
                <p className="mb-[15px] ml-[15px] text-[10px] text-[rgba(0,0,0,.6)]">
                  Сокращенное наименование юридического лица
                </p>
                <div className={styles.companyBtns}>
                  <button
                    className={`${
                      registrationStep > 4 && styles.companyBtnActive
                    }`}
                    onClick={() => {
                      setTimeout(() => {
                        if (registrationStep !== 5) {
                          scrollTosurnameRef();
                        }
                      }, 5);
                      setRegistrationStep(5);
                    }}
                    type="button"
                  >
                    Да
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      formik.values.inn = "";
                      setRegistrationStep(3);
                      setCompanyName("");
                    }}
                  >
                    Нет
                  </button>
                </div>
              </div>
            )}
          </div>
          {registrationStep > 4 && (
            <>
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
                  autoFocus
                  ref={surnameRef}
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
                  ref={ref as Ref<HTMLInputElement>}
                  id="phone"
                  name="phone"
                  label="Телефон"
                  type="phone"
                  value={value}
                  onChange={formik.handleChange}
                  onInput={(e: FormEvent<HTMLInputElement>) => {
                    setValue(e.currentTarget.value);
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
                  id="personalDataAgreement"
                  name="personalDataAgreement"
                  isSelected={formik.values.personalDataAgreement}
                  onChange={formik.handleChange}
                  classNames={checkStyle}
                >
                  Я даю{" "}
                  <Link
                    to="/documents/soglasie_na_obrabotku_personalnyh_dannyh"
                    target="_blank"
                    className="text-accent underline text-sm"
                  >
                    Согласие на обработку персональных данных
                  </Link>{" "}
                  в соответствии с{" "}
                  <Link
                    to="/documents/politika_v_otnoshenii_obrabotki_personalnyh_dannyh_polzovateley_saita"
                    target="_blank"
                    className="text-accent underline text-sm"
                  >
                    Политикой в отношении обработки персональных данных
                  </Link>{" "}
                  и принимаю условия{" "}
                  <Link
                    to="/documents/polzovatelskoe_soglashenie"
                    target="_blank"
                    className="text-accent underline text-sm"
                  >
                    Пользовательского соглашения
                  </Link>
                  .
                  <p className={`${styles.errorMessage} ${styles.checkErr}`}>
                    {formik.errors.personalDataAgreement}
                  </p>
                </Checkbox>
                <p className="w-[478px] text-left text-[14px] mb-[15px] text-[rgba(0,0,0,.6)]">
                  Пользователь Сайта уведомлен о том, что Оператор направляет
                  ему информационно-рекламные рассылки и материалы. В случае
                  несогласия на получение информационно-рекламных рассылок и
                  материалов, необходимо направить заявление по форме,
                  размещенной на Сайте Оператора, либо в произвольной форме на
                  адрес электронной почты info@ubrato.ru.
                </p>
              </div>
              <div className={styles.submitContainer}>
                <input
                  disabled={isLoading || !formik.isValid}
                  className={styles.submit}
                  type="submit"
                  value="Зарегистрироваться"
                />
              </div>
            </>
          )}
        </form>
      </div>
      <Modal isOpen={openModal}>
        <InfoModal
          title="Вы успешно отправили заявку на регистрацию на сайте Ubrato"
          text="Для завершения регистрации, пожалуйста, подтвердите адрес электронной почты"
          onClose={() => {
            setOpenModal(false);
            document.body.style.overflow = "auto";
          }}
        />
      </Modal>
    </div>
  );
};
