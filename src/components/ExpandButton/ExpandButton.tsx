import { FC } from 'react';
import styles from './expandbutton.module.css';

export const ExpandButton: FC = () => {
  return (
    <div style={{height: '100%'}}>
      <div className={styles.container}>
        <img src="./arrow-down.svg" alt="" />
      </div>
    </div>
  );
};
