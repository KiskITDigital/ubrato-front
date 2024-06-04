import { FC, useEffect, useRef, useState } from "react";
import styles from './settings-page.module.css'
import { Link } from "react-router-dom";

const SettingsPage: FC = () => {
    const startRef = useRef<HTMLHeadingElement>(null)

    const [status, setStatus] = useState<'unverified' | 'success' | 'blocked'>('unverified');

    useEffect(() => {
        startRef.current!.scrollIntoView({ behavior: "smooth" })
        setTimeout(() => {
            const elementTop = startRef.current!.getBoundingClientRect().top;
            window.scrollBy({ top: elementTop - 200, behavior: "smooth" });
        }, 0);
    }, []);
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
            <div className={styles.section}>
                <p className={styles.section__name}>Пользовательские данные</p>
                <div className={styles.section__container}>
                    <div className={styles.inputBlock}>
                        <p className={styles.inputBlock__name}>Email</p>
                        <input className={styles.inputBlock__input} type="text" />
                    </div>
                    <div className={styles.inputBlock}>
                        <p className={styles.inputBlock__name}>Пароль</p>
                        <input className={styles.inputBlock__input} type="text" />
                    </div>
                    <button className={styles.updateAccaunt}>Изменить</button>
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