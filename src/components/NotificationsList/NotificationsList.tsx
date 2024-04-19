import { FC, RefObject } from 'react';
import styles from './notificationslist.module.css';
import { useNotificationsStore } from '@/store/notificationsStore';
import { Link } from 'react-router-dom';

export const NotificationsList: FC<{
  isDisplayed: boolean;
  closeList: (state: boolean) => void;
  listRef: RefObject<HTMLDivElement>;
}> = ({ isDisplayed, closeList, listRef }) => {
  const notificationsStore = useNotificationsStore();

  
  return (
    <div
      tabIndex={1}
      ref={listRef}
      className={`${styles.container} ${isDisplayed ? '' : styles.displayNone}`}
    >
      <div className={styles.scroll}>
        {notificationsStore.notifications.notifications.map(
          (e) =>
            !e.read && (
              <div key={e.id} className={`${styles.listItem}`}>
                {e.header}
                <button onClick={() => notificationsStore.setNotificationRead(e.id)}>
                  <img src="/x-icon.svg" alt="" />
                </button>
              </div>
            )
        )}
        {notificationsStore.notifications.total === 0 && <p>Новых уведомлений нет</p>}
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <div className="">1</div>
        <Link onClick={() => closeList(false)} to="./profile" className={styles.link}>
          Смотреть все
        </Link>
      </div>
    </div>
  );
};
