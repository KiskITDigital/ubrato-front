import { FC } from 'react';
import styles from './mainbanner.module.css';

export const MainBanner: FC = () => {
  return (
    <div className={`container ${styles.container}`}>
      <div>
        <h1 className={styles.header}>
          <span className={styles.blueText}>Весь рынок</span> клининга на одной площадке
        </h1>
        <p className={styles.agregator}>Агрегатор клининга</p>
        <div className={styles.createTender}>
          <input type="text" name="tender_text" />
          <button>Создать тендер</button>
        </div>
      </div>
      <img className={styles.image} src="./banner-image.png" alt="big-man" />
    </div>
  );
};
