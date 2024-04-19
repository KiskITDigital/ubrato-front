import { FC, useEffect, useRef, useState } from 'react';
import styles from './notifications.module.css';
import { useNotificationsStore } from '@/store/notificationsStore';
import { NotificationsList } from '../NotificationsList/NotificationsList';
import { useClickOutside } from '@/hooks';

export const Notifications: FC = () => {
  const notificationsStore = useNotificationsStore();

  const fetchNotifications = notificationsStore.fetchNotifications;
  const [isDisplayed, setIsDisplayed] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  useClickOutside(listRef, () => {
    if (isDisplayed) {
      setTimeout(() => setIsDisplayed(false), 210);
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchNotifications(token);
    }
  }, [fetchNotifications]);

  return (
    <div className={styles.container}>
      <button
        className={styles.dis}
        onClick={() => {
          setIsDisplayed(!isDisplayed);
        }}
      >
        <img className={styles.img} src="/bell.svg" alt="" />
      </button>
      <div className={styles.count}>{notificationsStore.notifications.total}</div>
      <NotificationsList listRef={listRef} closeList={setIsDisplayed} isDisplayed={isDisplayed} />
    </div>
  );
};
