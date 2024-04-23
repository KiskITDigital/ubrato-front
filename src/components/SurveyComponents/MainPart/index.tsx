import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useUserInfoStore } from '@/store/userInfoStore';

export const SurveyMainPart: FC = () => {
  const userStore = useUserInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem('token') ||
      userStore.error ||
      (userStore.isLoggedIn && !userStore.user.is_contractor) ||
      userStore.passedSurvey
    ) {
      navigate('/');
    }
  }, [
    navigate,
    userStore.error,
    userStore.isLoggedIn,
    userStore.loading,
    userStore.passedSurvey,
    userStore.user.is_contractor,
  ]);

  if (!userStore.isLoggedIn || !userStore.user.is_contractor || userStore.passedSurvey) {
    return <div></div>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
