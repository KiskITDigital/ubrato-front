import { useUserInfoStore } from '@/store/userInfoStore';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: FC = () => {
  const userInfo = useUserInfoStore();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    userInfo.setLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    if (!userInfo.isLoggedIn) {
      navigate('/');
    }
  }, [navigate, userInfo.isLoggedIn])

  return (
    <div className="conatiner">
      <h1>{userInfo.user.first_name}</h1>
      <h2>{userInfo.user.phone}</h2>
      <h3>{userInfo.user.is_contractor ? 'Заказчик и исполнитель' : 'Заказчик'}</h3>
      <button onClick={handleLogOut}>Выйти</button>
    </div>
  );
};
