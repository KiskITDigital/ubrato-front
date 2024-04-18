import { FC, useEffect } from 'react';
import styles from './notifications.module.css';
import { useNotificationsStore } from '@/store/notificationsStore';

export const Notifications: FC = () => {
  const notificationsStore = useNotificationsStore();

  const fetchNotifications = notificationsStore.fetchNotifications;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchNotifications(token);
    }
  }, [fetchNotifications]);

  return (
    <div className={styles.container}>
      <button>
        <img className={styles.img} src="/bell.svg" alt="" />
      </button>
      <div className={styles.count}>{notificationsStore.notifications.total}</div>
    </div>
  );
};
