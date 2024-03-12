import { FC } from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header className={`container ${styles.container}`}>
      <div className={styles.headerTop}>
        <img src="./logo.svg" alt="logo" />
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
        <div className={styles.loginRegister}>
          <Link to="/" className={styles.loginLink}>
            <img src="./login.svg" alt="login" />
            <p className={styles.loginText}>Вход</p>
          </Link>
          <Link to="/" className={styles.registrationLink}>
            <p className={styles.registrationText}>Регистрация</p>
          </Link>
        </div>
      </div>
    </header>
  );
};
