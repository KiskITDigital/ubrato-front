import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useUserInfoStore } from '@/store/userInfoStore';

export const SurveyMainPart: FC = () => {
  const userStore = useUserInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token') || userStore.error) {
      navigate('/');
    }
  }, [navigate, userStore.error, userStore.isLoggedIn, userStore.loading]);

  if (!userStore.isLoggedIn) {
    return <div></div>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
