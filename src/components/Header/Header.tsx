import { FC, useEffect, useRef, useState } from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useUserInfoStore } from '@/store/userInfoStore';
import { Avatar } from '@nextui-org/react';
import { useIsOrdererState } from '@/store/isOrdererStore';
import { Notifications } from '..';
import { updateToken } from '@/api';

export const Header: FC = () => {
  const userInfoStorage = useUserInfoStore();
  const isOrdererState = useIsOrdererState();

  const width: number | null = null;
  const widthR = useRef<number | null>(width);

  const fetchUser = userInfoStorage.fetchUser;

  const handleState = isOrdererState.handleState;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const avatarStyle = {
    base: styles.base,
    img: styles.avatarImg,
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      (async () => {
        await updateToken<void, undefined>(fetchUser, undefined);
      })();
    }
  }, [fetchUser]);

  useEffect(() => {
    handleState(userInfoStorage.user.is_contractor ? 'contractor' : 'orderer');
  }, [handleState, userInfoStorage.user.is_contractor]);

  useEffect(() => {
    if (window.outerWidth <= 450) {
      widthR.current = window.outerHeight;
    }
    navigator.geolocation.getCurrentPosition((e) => {
      console.log(e);
      
    });
  }, []);

  return (
    <header className={`${styles.container}`}>
      {widthR.current && isMenuOpen && (
        <div
          onClick={() => {
            setIsMenuOpen(false);
          }}
          className={styles.mobileMenuWrapper}
        >
          <div className={styles.mobileMenu}>
            <Link to="/">Создать тендер</Link>
            <Link to="/">Найти исполнителя</Link>
            <Link to="/">Найти тендер</Link>
            <Link to="/">Мои тендеры</Link>
            <Link to="/">О сервисе</Link>
            <Link to="/">Правовая информация</Link>
          </div>
        </div>
      )}
      <div className={`container ${styles.mobileContainer}`}>
        <div className={styles.headerTop}>
          {widthR.current ? (
            <button
              className={styles.burger}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <img src="/burger_button.svg" alt="" />
            </button>
          ) : (
            ''
          )}
          <Link to="/">
            <img src={widthR.current ? '/logo-mobile.svg' : '/logo.svg'} alt="logo" />
          </Link>
          <div className={styles.headerTopLinks}>
            <Link to="/">
              <p className={styles.text}>О сервисе</p>
            </Link>
            <Link to="/">
              <p className={styles.text}>8 800-775-67-57</p>
            </Link>
            <div className={styles.location}>
              <img src="/location.svg" alt="location" />
              <p className={styles.locationText}>Москва</p>
            </div>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <nav>
            <ul className={styles.navLinksList}>
              <li>
                <Link to="/" className={styles.navLink}>
                  <img src="/create-tender.svg" alt="create-tender" />
                  <p>Создать тендер</p>
                </Link>
              </li>
              <li>
                <Link to="/" className={styles.navLink}>
                  <img src="/find-executor.svg" alt="find-executor" />
                  <p>Найти исполнителя</p>
                </Link>
              </li>
              {(userInfoStorage.user.is_contractor || !userInfoStorage.isLoggedIn) && (
                <li>
                  <Link to="/" className={styles.navLink}>
                    <img src="/find-tender.svg" alt="my-tender" />
                    <p>Найти тендер</p>
                  </Link>
                </li>
              )}
              <li>
                <Link to="/" className={styles.navLink}>
                  <img src="/my-tenders.svg" alt="my-tenders" />
                  <p>Мои тендеры</p>
                </Link>
              </li>
            </ul>
          </nav>
          {!userInfoStorage.isLoggedIn && (
            <div className={styles.loginRegister}>
              <Link to="/login" className={styles.loginLink}>
                <img src="/login.svg" alt="login" />
                <p className={styles.loginText}>Вход</p>
              </Link>
              {widthR.current ? (
                ''
              ) : (
                <Link to="/register" className={styles.registrationLink}>
                  <p className={styles.registrationText}>Регистрация</p>
                </Link>
              )}
            </div>
          )}
          {userInfoStorage.isLoggedIn && (
            <div className={styles.notifContainer}>
              <Link to="/profile" className={styles.profileLink}>
                <div className={styles.orgInfo}>
                  <p className={styles.organizationText}>
                    {userInfoStorage.user.organization.short_name}
                  </p>
                  <p className={styles.organizationText}>
                    ИНН {userInfoStorage.user.organization.inn}
                  </p>
                </div>
                <Avatar
                  src={userInfoStorage.user.avatar}
                  classNames={avatarStyle}
                  name={userInfoStorage.user.first_name}
                />
              </Link>
              <Notifications />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
