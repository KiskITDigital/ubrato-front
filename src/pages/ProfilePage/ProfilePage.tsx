import { surveyCheck } from '@/api';
import { AvatarInput } from '@/components/AvatarInput/AvatarInput';
import { useUserInfoStore } from '@/store/userInfoStore';
import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ProfilePage: FC = () => {
  const userStore = useUserInfoStore();
  const navigate = useNavigate();
  const setPassedSurvey = userStore.setPassedSurvey;

  const handleLogOut = () => {
    localStorage.removeItem('token');
    userStore.setLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || userStore.error) {
      navigate('/');
    } else {
      (async () => {
        setPassedSurvey(await surveyCheck(token));
      })();
    }
  }, [navigate, setPassedSurvey, userStore.error, userStore.isLoggedIn, userStore.loading]);

  if (!userStore.isLoggedIn) {
    return <div></div>;
  }

  return (
    <div className="conatiner">
      <h1>{userStore.user.first_name}</h1>
      <h2>{userStore.user.phone}</h2>
      <h3>{userStore.user.is_contractor ? 'Заказчик и исполнитель' : 'Заказчик'}</h3>
      <button onClick={handleLogOut}>Выйти</button>
      <AvatarInput />
      <h2>{userStore.passedSurvey ? 'Опрос пройден' : <Link to="/survey">Опрос</Link>}</h2>
    </div>
  );
};
