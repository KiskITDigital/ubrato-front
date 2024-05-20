import { updateToken, surveyCheck } from '@/api';
import { ProfileNavigation } from '@/components';
import { useUserInfoStore } from '@/store/userInfoStore';
import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './proflepage.module.css'

export const ProfilePage: FC = () => {
  const userStore = useUserInfoStore();
  const navigate = useNavigate();
  const setPassedSurvey = userStore.setPassedSurvey;

  useEffect(() => {
    (async () => {
      setPassedSurvey(await updateToken<boolean, null>(surveyCheck, null));
    })();
  }, [setPassedSurvey]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || userStore.error) {
      navigate('/');
    }
  }, [navigate, userStore.error]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!userStore.isLoggedIn) {
    return <div></div>;
  }

  return (
    <div className="container flex">
      <ProfileNavigation />
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};
