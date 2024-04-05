import { FC } from 'react';
import styles from './footer.module.css';
import { Link } from 'react-router-dom';
import { useUserInfoStore } from '@/store/userInfoStore';

export const Footer: FC = () => {
  const userInfoStorage = useUserInfoStore();

  return (
    <footer className={`container ${styles.container}`}>
      <div className={styles.footerTop}>
        <div className={styles.imgcontainer}>
          <img src="./minilogo2.png" className={styles.minilogo} alt="minilogo" />
          <img src="./logo.svg" className={styles.logo} alt="logo" />
        </div>
        {!userInfoStorage.isLoggedIn && (
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
        {userInfoStorage.isLoggedIn && (
          <Link to="/profile" className={styles.registrationLink}>
            <p className={styles.registrationText}>Личный кабинет</p>
          </Link>
        )}
      </div>
      <div className={styles.footerUnder}>
        <div className={styles.column}>
          <p className={styles.headercolumn}>Возможнонсти</p>
          <ul>
            <li>
              <Link to="/">
                <p className={styles.point}>Стать заказчиком</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>Стать исполнителем</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>Создать тендер</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>Найти тендер</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>Найти исполнителя</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <p className={styles.headercolumn}>Информация</p>
          <ul>
            <li>
              <Link to="/">
                <p className={styles.point}>Каталог услуг</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>Заказчикам</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>Исполнтелям</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>Отзывы об исполнителях</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>Частые вопросы</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>База знаний</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <p className={styles.headercolumn}>Об Ubrato</p>
          <ul>
            <li>
              <Link to="/">
                <p className={styles.point}>О сервисе</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>Контакты</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>Помощь</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className={styles.point}>Карта сайта</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles.column} ${styles.supportService}`}>
          <p className={styles.headercolumn}>Служба поддержки</p>
          <ul>
            <li>
              <Link to="/">
                <p className={styles.bluetext}>8 800-775-67-57</p>
              </Link>
              <p className={styles.pointtwo}>Время работы с 9:00 до 21:00 по Московскому времени</p>
            </li>
            <li>
              <Link to="/">
                <p className={styles.bluetext}>info@urbato.ru</p>
              </Link>
              <p className={styles.pointtwo}>Вопросы и предложения по работе сервиса</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.line}>
        <Link to="/">
          <p className={styles.confidental}>Политика обработки персональных данных</p>
        </Link>
        <Link to="/">
          <p className={styles.confidental}>Пользовательское соглашение</p>
        </Link>
        <Link to="/">
          <p className={styles.confidental}>Согласие на обработку персональных данных</p>
        </Link>
      </div>
      <div className={styles.last}>
        <p className={styles.greytext}>
          © 2024 ООО “Интеграция”{' '}
          <Link to="/" className={styles.greytext}>
            (ubrato.ru)
          </Link>
        </p>
      </div>
    </footer>
  );
};
