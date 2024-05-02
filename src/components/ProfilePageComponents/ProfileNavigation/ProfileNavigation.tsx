/// <reference types="vite-plugin-svgr/client" />
import { AvatarInput } from '@/components/AvatarInput/AvatarInput';
import { useUserInfoStore } from '@/store/userInfoStore';
import { FC, useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styles from './profilenav.module.css';
import {
  DocumentsIC,
  HeartIC,
  LogoutIC,
  SurveyIC,
  CompanyProfiveIC,
  BellIC,
  SettingsIC,
  TenderIC,
  HelpIC,
} from './icons';

export const ProfileNavigation: FC = () => {
  const userStore = useUserInfoStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState('');
  const [isMenuActive, setIsmenuActive] = useState(true);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    userStore.setLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    setPage(location.pathname);
  }, [location]);

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsmenuActive(!isMenuActive)}
        className={`${styles.menuBtn} ${isMenuActive ? '' : styles.menuBtnActive}`}
      >
        <img src="/profile-menu-btn.svg" alt="" />
      </button>
      {isMenuActive && (
        <div className={styles.avatar}>
          <AvatarInput />
        </div>
      )}
      {isMenuActive && (
        <div className={styles.info}>
          <p>{userStore.user.organization.short_name}</p>
          <p>
            ИНН <span className={styles.blueText}>{userStore.user.organization.inn}</span>
          </p>
        </div>
      )}
      <div className={styles.links}>
        {userStore.user.is_contractor && !userStore.passedSurvey && (
          <Link to="/survey" className={`${styles.link} ${isMenuActive ? '' : styles.linkActive}`}>
            <SurveyIC />
            {isMenuActive && 'Анкета'}
          </Link>
        )}
        <Link
          to="company"
          className={`${styles.link} ${
            page.includes('company') ? (isMenuActive ? styles.active : styles.active2) : ''
          } ${isMenuActive ? '' : styles.linkActive}`}
        >
          <CompanyProfiveIC />
          {isMenuActive && 'Профиль компании'}
        </Link>

        <Link
          to="tenders"
          className={`${styles.link} ${
            page.includes('tenders') ? (isMenuActive ? styles.active : styles.active2) : ''
          } ${isMenuActive ? '' : styles.linkActive}`}
        >
          <TenderIC />
          {isMenuActive && 'Мои тендеры'}
        </Link>
        <Link
          to="favourite"
          className={`${styles.link} ${
            page.includes('favourite') ? (isMenuActive ? styles.active : styles.active2) : ''
          } ${isMenuActive ? '' : styles.linkActive}`}
        >
          <HeartIC />
          {isMenuActive && 'Избранное'}
        </Link>
        <Link
          to="notifications"
          className={`${styles.link} ${
            page.includes('notifications') ? (isMenuActive ? styles.active : styles.active2) : ''
          } ${isMenuActive ? '' : styles.linkActive}`}
        >
          <BellIC />
          {isMenuActive && 'Уведомления'}
        </Link>
        <Link
          to="documents"
          className={`${styles.link} ${
            page.includes('documents') ? (isMenuActive ? styles.active : styles.active2) : ''
          } ${isMenuActive ? '' : styles.linkActive}`}
        >
          <DocumentsIC />
          {isMenuActive && 'Документы'}
        </Link>
        <Link
          to="settings"
          className={`${styles.link} ${
            page.includes('settings') ? (isMenuActive ? styles.active : styles.active2) : ''
          } ${isMenuActive ? '' : styles.linkActive}`}
        >
          <SettingsIC />
          {isMenuActive && 'Настройки'}
        </Link>
        <Link
          to="help"
          className={`${styles.link} ${
            page.includes('help') ? (isMenuActive ? styles.active : styles.active2) : ''
          } ${isMenuActive ? '' : styles.linkActive}`}
        >
          <HelpIC />
          {isMenuActive && 'Помощь'}
        </Link>
      </div>

      {isMenuActive && (
        <button className={styles.logout} onClick={handleLogOut}>
          <LogoutIC />
          Выйти
        </button>
      )}
    </div>
  );
};
