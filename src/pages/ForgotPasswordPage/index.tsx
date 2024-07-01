import { useEffect, useState } from 'react';
import styles from './forgot-password.module.css'
import { AxiosError } from 'axios';
import { login } from '@/api';

const ForgotPasswordPage = () => {
    const [errorMsg, setErrorMsg] = useState<"Почта указана неверно" | "" | "Что-то пошло не так" | "Пользователя с таким e-mail не существует" | "allowed">("");

    const handleChange = async (newVal: string) => {
        if (newVal === "") { setErrorMsg(""); return }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newVal)) {
            setErrorMsg("Почта указана неверно")
        } else {
            if (errorMsg === "Почта указана неверно") setErrorMsg("")
            try {
                await login({ email: newVal, password: "" })
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 404) {
                        setErrorMsg('Пользователя с таким e-mail не существует');
                    } else if (e.response?.status === 401) {
                        setErrorMsg("allowed")
                    } else {
                        setErrorMsg('Что-то пошло не так');
                    }
                }
            }
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`container ${styles.container}`}>
            <h1 className={styles.header}>Вход</h1>
            <p className={'ml-[15px] text-[var(--color-black-60)] font-[600]'}>
                Введите электронную почту, указанную при регистрации
            </p>
            <label className={styles.inputWrapper} htmlFor="">
                <p className={styles.inputLabel}>Логин (Email)</p>
                <input className={`${styles.input} ${errorMsg !== "allowed" && errorMsg !== "" ? styles.errorInput : ""}`} placeholder="Электронная почта" type="text" onChange={(e) => handleChange(e.currentTarget.value)} />
                {errorMsg !== "allowed" && <p className={styles.errorMessage}>{errorMsg}</p>}
            </label>
            <button className={styles.sendButton} disabled={errorMsg !== "allowed"}>Запросить код</button>
        </div>
    );
}

export default ForgotPasswordPage;