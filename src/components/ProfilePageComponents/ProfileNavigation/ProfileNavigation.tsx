/// <reference types="vite-plugin-svgr/client" />
import { AvatarInput } from '@/components/AvatarInput/AvatarInput';
import { useUserInfoStore } from '@/store/userInfoStore';
import { FC, useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styles from './profilenav.module.css';
import DocumentsIC from './icons/documents-ic.svg?react';
import SurveyIC from './icons/survey-ic.svg?react';
import LogoutIC from './icons/logout-ic.svg?react';
import HeartIC from './icons/heart-ic.svg?react';

export const ProfileNavigation: FC = () => {
  const userStore = useUserInfoStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState('');

  const handleLogOut = () => {
    localStorage.removeItem('token');
    userStore.setLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    console.log(location);
    setPage(location.pathname);
  }, [location]);

  return (
    <div className={styles.container}>
      <AvatarInput />
      <div className={styles.info}>
        <p>{userStore.user.organization.short_name}</p>
        <p>
          ИНН <span className={styles.blueText}>{userStore.user.organization.inn}</span>
        </p>
      </div>
      <div className={styles.links}>
        {userStore.user.is_contractor && !userStore.passedSurvey && (
          <Link to="/survey" className={styles.link}>
            <SurveyIC />
            Анкета
          </Link>
        )}
        <Link
          to="favourite"
          className={`${styles.link} ${page.includes('favourite') ? styles.active : ''}`}
        >
          <HeartIC />
          Избранное
        </Link>
        <Link
          to="documents"
          className={`${styles.link} ${page.includes('documents') ? styles.active : ''}`}
        >
          <DocumentsIC />
          Документы
        </Link>
      </div>

      <button className={styles.logout} onClick={handleLogOut}>
        <LogoutIC />
        Выйти
      </button>
    </div>
  );
};
