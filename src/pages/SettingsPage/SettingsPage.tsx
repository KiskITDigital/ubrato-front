import { FC, useEffect, useRef, useState } from "react";
import styles from './settings-page.module.css'
import { Link } from "react-router-dom";
import { Input } from "@nextui-org/react";
import { LoginFormValuesT } from "@/types/app";
import { useFormik } from "formik";
import { login } from "@/api";
import { loginSchema } from '@/validation/loginSchema';
import { AxiosError } from "axios";
import { useUserInfoStore } from "@/store/userInfoStore";

const SettingsPage: FC = () => {
    const startRef = useRef<HTMLHeadingElement>(null)

    const userInfoStore = useUserInfoStore()

    const [status, setStatus] = useState<'unverified' | 'success' | 'blocked'>('unverified');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const initialValues: LoginFormValuesT = {
        email: userInfoStore.user.email,
        password: '',
    };

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
                        // await userInfoStore.fetchUser(token);
                        console.log('smth');
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

    useEffect(() => {
        startRef.current!.scrollIntoView({ behavior: "smooth" })
        setTimeout(() => {
            const elementTop = startRef.current!.getBoundingClientRect().top;
            window.scrollBy({ top: elementTop - 200, behavior: "smooth" });
        }, 0);
    }, []);

    const itemClasses = {
        input: styles.input,
        innerWrapper: styles.innerWrapper,
        base: styles.base,
        label: styles.label,
        errorMessage: styles.errorMessage,
        helperWrapper: styles.helperWrapper,
    };

    return (
        <section ref={startRef} className={styles.container}>
            <p className={styles.title}>Настройки аккаунта</p>
            <div className={styles.section}>
                <p className={styles.section__name}>Статус</p>
                <div className={`${styles.section__container} ${styles.section__containerStatus}`}>
                    <p className={`${styles.status} ${status === 'success' ? styles.statusSuccess : styles.statusUnSuccess}`}>{status === 'success' ? 'Верефицирован' : status === 'blocked' ? 'Заблокирован' : 'Подтвердите почту'}</p>
                    {status === 'unverified' &&
                        <div className={styles.statusVerifyBlock}>
                            <button
                                onClick={() => setStatus('success')}
                                className={styles.sendMessage}>Отправить письмо</button>
                            <div className={styles.info}>
                                <img className={styles.info__img} src="/info-ic.svg" alt="i" />
                                <p className={styles.info__text}>Чтобы начать работу с тендерами пройдите верификацию</p>
                            </div>
                        </div>
                    }
                    {status === 'blocked' &&
                        <>
                            <p className={styles.statusBlockedText}>Описание причины (текст из Админки отправляет Админ)</p>
                            <p className={styles.statusBlockedAction}>Не поняли причину?<br /><Link className={styles.sectionLink} to="/profile/help">Напишите телефон</Link> и мы перезвоним</p>
                            <button className={styles.deleteAccaunt}>Удалить аккаунт</button>
                        </>
                    }
                </div>
            </div>
            <div className={`${styles.section} ${styles.sectionUserData}`}>
                <p className={styles.section__name}>Пользовательские данные</p>
                <div className={styles.section__container}>
                    <div className={styles.inputBlock}>
                        <p className={styles.inputBlock__name}>Email</p>
                        {/* <input className={styles.inputBlock__input} type="text" /> */}
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            // label="Логин (Email)"
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
                    <div className={styles.inputBlock}>
                        <p className={styles.inputBlock__name}>Пароль</p>
                        <Input
                            id="password"
                            name="password"
                            type={isPasswordVisible ? 'text' : 'password'}
                            // label="Пароль"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Введите пароль"
                            isInvalid={Boolean(formik.errors.password)}
                            errorMessage={formik.errors.password}
                            endContent={
                                <button onClick={() => setIsPasswordVisible(prev => !prev)} type="button">
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
                    </div>
                    <button disabled={isLoading} className={styles.updateAccaunt}>Изменить</button>
                    {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
                </div>
            </div>
            <div className={styles.section}>
                <p className={styles.section__name}>Правовые документы</p>
                <div className={styles.section__container}>
                    <Link className={styles.sectionLink} to="/">Политика обработки персональных данных</Link>
                    <Link className={styles.sectionLink} to="/">Пользовательское соглашение</Link>
                    <Link className={styles.sectionLink} to="/">Согласие на обработку персональных данных</Link>
                </div>
            </div>
            <div className={styles.section}>
                <p className={styles.section__name}>Обратная связь</p>
                <div className={styles.section__container}>
                    <p className={styles.sectionText}>Есть вопросы по настройке аккаунта? <Link className={styles.sectionLink} to="/profile/help">Напишите телефон</Link> и мы перезвоним</p>
                </div>
            </div>
            {status !== 'blocked' && <button className={styles.deleteAccaunt}>Удалить аккаунт</button>}
        </section>
    );
}

export default SettingsPage;