import { FC, useEffect } from 'react';
import styles from './ordererprofile.module.css';
import { useUserInfoStore } from '@/store/userInfoStore';
import { useNavigate } from 'react-router-dom';

export const OrdererProfile: FC = () => {
  const navigate = useNavigate();
  const userStore = useUserInfoStore();

  useEffect(() => {
    if (!userStore.user.is_contractor) {
      navigate('../');
    }
  }, [navigate, userStore.user.is_contractor]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Профиль Заказчика</h2>
      <div className={styles.infoContainer}>
        <img src="/info-blue-ic.svg" alt="" />
        <p className={styles.infoText}>
          Информация о вашей компании будет доступна компаниям-исполнителям после подведения итогов
          тендера.
        </p>
      </div>
      <p className={styles.text}>
        Нажмите на кнопку “Смотреть”, чтобы посмотреть, как эту информацию увидят ваши партнеры.
      </p>
      <div className={styles.borderedContainer}>
        <div className={styles.infoContainer}>
          <img src="/info-blue-ic.svg" alt="" />
          <p className={styles.infoTextBig}>Укажите подробное описание и локации вашей компании</p>
        </div>
      </div>
      <div className={styles.description}>
        <p>Описание компании</p>
        <textarea
          className={styles.textarea}
          onChange={(e) => {
            console.log(e);
            e.target.style.height = `${Math.floor((e.target.scrollHeight - 29) / 22) * 22 + 29}px`;
          }}
          name="description"
          id="description"
        ></textarea>
      </div>
      <div className={styles.locations}>
        <p>Локации</p>
      </div>
    </div>
  );
};
