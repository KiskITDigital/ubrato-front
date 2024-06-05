import { FC, useEffect, useRef, useState } from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useUserInfoStore } from '@/store/userInfoStore';
import { Avatar } from '@nextui-org/react';
import { useIsOrdererState } from '@/store/isOrdererStore';
import { Notifications } from '..';
import { updateToken } from '@/api';
import axios from 'axios';
import { CityModal } from '../CityModal/CityModal';

export const Header: FC = () => {
  const userInfoStorage = useUserInfoStore();
  const isOrdererState = useIsOrdererState();

  const width: number | null = null;
  const widthR = useRef<number | null>(width);

  const fetchUser = userInfoStorage.fetchUser;

  const handleState = isOrdererState.handleState;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCityModalOpern, setIsCityModalOpern] = useState(false);
  const [confirm, setConfirm] = useState<boolean>(true);
  const [city, setCity] = useState('');

  const handleConfirm = () => {
    const { city } = JSON.parse(localStorage.getItem('userCity')!);
    localStorage.setItem('userCity', JSON.stringify({ city: city, confirmed: true }));
    setConfirm(true);
  };

  const setNewCity = (newCity: string) => {
    localStorage.setItem('userCity', JSON.stringify({ city: newCity, confirmed: true }));
    setCity(newCity);
  };

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
    const localCity = JSON.parse(localStorage.getItem('userCity') ?? '{}');
    setCity(
      localCity.city ? (localCity.city != 'undefined' ? localCity.city : 'Не определён') : ''
    );
    if (!localCity.confirmed) {
      (async () => {
        setConfirm(false);
        const curAxios = axios.create({ withCredentials: false });
        const res = await curAxios.get('https://geolocation-db.com/json/');
        console.log(res);
        const lat = res.data.latitude;
        const lon = res.data.longitude;
        const res2 = await curAxios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
          { headers: { 'Accept-language': 'ru-RU' } }
        );
        console.log(res2);
        localStorage.setItem(
          'userCity',
          JSON.stringify({ city: res2.data.address.city, confirmed: false })
        );
        setCity(res2.data.address.city ?? 'Не определён');
      })();
    }
  }, []);

  return (
    <header className={`${styles.container}`}>
      {isCityModalOpern && <CityModal setCity={setNewCity} setConfirm={setConfirm} setModal={setIsCityModalOpern} />}
      {!!widthR.current && isMenuOpen && (
        <div
          onClick={() => {
            setIsMenuOpen(false);
          }}
          className={styles.mobileMenuWrapper}
        >
          <div className={styles.mobileMenu}>
            <Link to="/create-tender">Создать тендер</Link>
            <Link to="/find-executor">Найти исполнителя</Link>
            <Link to="/alltenders">Найти тендер</Link>
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
            <img className={styles.logo} src={widthR.current ? '/logo-mobile.svg' : '/logo.svg'} alt="logo" />
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
              <p
                onClick={() => {
                  setConfirm(false);
                }}
                className={styles.locationText}
              >
                {city}
              </p>
              {!confirm && (
                <div className={styles.cityConfirm}>
                  <p>Ваш город {city}?</p>
                  <div>
                    <button onClick={() => handleConfirm()}>Да</button>
                    <button
                      onClick={() => {
                        document.body.style.overflow = 'hidden';
                        setIsCityModalOpern(true);
                      }}
                    >
                      Нет
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <nav>
            <ul className={styles.navLinksList}>
              <li>
                <Link to="/create-tender" className={styles.navLink}>
                  <img src="/create-tender.svg" alt="create-tender" />
                  <p>Создать тендер</p>
                </Link>
              </li>
              <li>
                <Link to="/find-executor" className={styles.navLink}>
                  <img src="/find-executor.svg" alt="find-executor" />
                  <p>Найти исполнителя</p>
                </Link>
              </li>
              {(userInfoStorage.user.is_contractor || !userInfoStorage.isLoggedIn) && (
                <li>
                  <Link to="/alltenders" className={styles.navLink}>
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
}
