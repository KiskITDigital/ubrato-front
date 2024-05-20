import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './company.module.css';

export const Company: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className={styles.btnsContainer}>
        <button
          disabled={
            !location.pathname.includes('orderer') && !location.pathname.includes('contractor')
          }
          className={styles.btn}
          onClick={() => {
            navigate('');
          }}
        >
          Информация о компании
        </button>
        <button
          onClick={() => {
            navigate('orderer');
          }}
          disabled={location.pathname.includes('orderer')}
          className={styles.btn}
        >
          Профиль заказчика
        </button>
        <button
          onClick={() => {
            navigate('contractor');
          }}
          disabled={location.pathname.includes('contractor')}
          className={styles.btn}
        >
          Профиль Исполнителя
        </button>
      </div>
      <Outlet />
    </div>
  );
};
