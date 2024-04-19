import { FC, useEffect, useRef, useState } from 'react';
import styles from './notifications.module.css';
import { useNotificationsStore } from '@/store/notificationsStore';
import { NotificationsList } from '../NotificationsList/NotificationsList';

export const Notifications: FC = () => {
  const notificationsStore = useNotificationsStore();

  const fetchNotifications = notificationsStore.fetchNotifications;
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [needDisplayed, setNeedDisplayed] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchNotifications(token);
    }
  }, [fetchNotifications]);

  useEffect(() => {
    if (isDisplayed) {
      listRef.current?.focus();
    } else {
      setNeedDisplayed(false);
    }
  }, [isDisplayed]);

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          if (!isDisplayed && !needDisplayed) {
            setNeedDisplayed(true);
            setIsDisplayed(true);
          } else if (needDisplayed && !isDisplayed) {
            setNeedDisplayed(false);
          }
        }}
      >
        <img className={styles.img} src="/bell.svg" alt="" />
      </button>
      <div className={styles.count}>{notificationsStore.notifications.total}</div>
      <NotificationsList
        listRef={listRef}
        closeList={setIsDisplayed}
        isDisplayed={needDisplayed && isDisplayed}
      />
    </div>
  );
};
