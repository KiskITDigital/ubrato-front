import { FC } from 'react';
import styles from './notifications.module.css';

export const Notifications: FC<{ count: number }> = ({ count }) => {
  return (
    <div className={styles.container}>
      <button>
        <img className={styles.img} src="/bell.svg" alt="" />
      </button>
      <div className={styles.count}>{count}</div>
    </div>
  );
};
