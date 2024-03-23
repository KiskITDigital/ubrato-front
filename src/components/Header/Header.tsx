import { FC, useEffect, useRef } from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useUserInfoStore } from '../../store/userInfoStore';

export const Header: FC = () => {
  const userInfoStorage = useUserInfoStore();

  // if (localStorage.getItem('token') !== undefined) {
  //   console.log(localStorage.getItem('token'))
  // }

  const width: number | null = null;
  const widthR = useRef<number | null>(width);

  const fetchUser = userInfoStorage.fetchUser;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      console.log(1);
      fetchUser(token);
    }
  }, [fetchUser]);

  const userinfoState = useUserInfoStore();

  useEffect(() => {
    if (window.outerWidth <= 450) {
      widthR.current = window.outerHeight;
    }
  }, []);

  return (
    <header className={`${styles.container}`}>
      <div className={`container ${styles.mobileContainer}`}>
        <div className={styles.headerTop}>
          <Link to="/">
            <img src={widthR.current ? './logo-mobile.svg' : './logo.svg'} alt="logo" />
          </Link>
          <div className={styles.headerTopLinks}>
            <Link to="/">
              <p className={styles.text}>О сервисе</p>
            </Link>
            <Link to="/">
              <p className={styles.text}>8 800-775-67-57</p>
            </Link>
            <div className={styles.location}>
              <img src="./location.svg" alt="location" />
              <p className={styles.locationText}>Москва</p>
            </div>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <nav>
            <ul className={styles.navLinksList}>
              <li>
                <Link to="/" className={styles.navLink}>
                  <img src="./create-tender.svg" alt="create-tender" />
                  <p>Создать тендер</p>
                </Link>
              </li>
              <li>
                <Link to="/" className={styles.navLink}>
                  <img src="./find-executor.svg" alt="find-executor" />
                  <p>Найти исполнителя</p>
                </Link>
              </li>
              <li>
                <Link to="/" className={styles.navLink}>
                  <img src="./find-tender.svg" alt="my-tender" />
                  <p>Найти тендер</p>
                </Link>
              </li>
              <li>
                <Link to="/" className={styles.navLink}>
                  <img src="./my-tenders.svg" alt="my-tenders" />
                  <p>Мои тендеры</p>
                </Link>
              </li>
            </ul>
          </nav>
          {!userinfoState.isLoggedIn && (
            <div className={styles.loginRegister}>
              <Link to="/login" className={styles.loginLink}>
                <img src="./login.svg" alt="login" />
                <p className={styles.loginText}>Вход</p>
              </Link>
              <Link to="/register" className={styles.registrationLink}>
                <p className={styles.registrationText}>Регистрация</p>
              </Link>
            </div>
          )}
          {userinfoState.isLoggedIn && <div>{userinfoState.user.first_name}</div>}
        </div>
      </div>
    </header>
  );
};
