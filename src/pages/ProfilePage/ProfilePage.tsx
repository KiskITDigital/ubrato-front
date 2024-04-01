import { AvatarInput } from '@/components/AvatarInput/AvatarInput';
import { useUserInfoStore } from '@/store/userInfoStore';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: FC = () => {
  const userInfo = useUserInfoStore();
  const navigate = useNavigate();
  const fetchUser = userInfo.fetchUser;

  const handleLogOut = () => {
    localStorage.removeItem('token');
    userInfo.setLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    // (async () => {
    //   const token = localStorage.getItem('token');
    //   if (token !== null) {
    //     await fetchUser(token);
    //     // console.log(userInfo.isLoggedIn);
    //     // if (!userInfo.isLoggedIn) {
    //     //   console.log(1);
    //     //   navigate('/');
    //     // }
    //   } else {
    //     navigate('/');
    //   }
    // })();
  }, [fetchUser, navigate]);

  return (
    <div className="conatiner">
      <h1>{userInfo.user.first_name}</h1>
      <h2>{userInfo.user.phone}</h2>
      <h3>{userInfo.user.is_contractor ? 'Заказчик и исполнитель' : 'Заказчик'}</h3>
      <button onClick={handleLogOut}>Выйти</button>
      <AvatarInput />
    </div>
  );
};
