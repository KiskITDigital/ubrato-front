import { updateToken, surveyCheck } from '@/api';
import { ProfileNavigation } from '@/components';
import { useUserInfoStore } from '@/store/userInfoStore';
import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const ProfilePage: FC = () => {
  const userStore = useUserInfoStore();
  const navigate = useNavigate();
  const setPassedSurvey = userStore.setPassedSurvey;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || userStore.error) {
      navigate('/');
    } else {
      (async () => {
        setPassedSurvey(await updateToken<boolean, null>(surveyCheck, null));
      })();
    }
  }, [navigate, setPassedSurvey, userStore.error, userStore.isLoggedIn, userStore.loading]);

  if (!userStore.isLoggedIn) {
    return <div></div>;
  }

  return (
    <div className="container flex">
      <ProfileNavigation />
      <Outlet />
    </div>
  );
};
