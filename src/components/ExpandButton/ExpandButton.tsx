import { FC } from 'react';
import styles from './expandbutton.module.css';

export const ExpandButton: FC<{isActive?: boolean}> = ({isActive}) => {
  return (
    <div style={{ height: '100%' }} >
      <div className={styles.container}>
        <img
          className={`${styles.image} ${isActive ? styles.active : ''}`}
          src="./arrow-down.svg"
          alt="arrow"
        />
      </div>
    </div>
  );
};
