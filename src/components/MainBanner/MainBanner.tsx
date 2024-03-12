import { FC } from 'react';
import styles from './mainbanner.module.css';
import { Link } from 'react-router-dom';

export const MainBanner: FC = () => {
  return (
    <div className={`container ${styles.container}`}>
      <div>
        <h1 className={styles.header}>
          <span className={styles.blueText}>Весь рынок</span> клининга на одной площадке
        </h1>
        <p className={styles.agregator}>Агрегатор клининга</p>
        <div className={styles.createTender}>
          <input className={styles.createTenderInput} type="text" name="tender_text" placeholder='Опишите задачу или объект' />
          <button className={styles.createTenderBtn}>Создать тендер</button>
        </div>
        <div className={styles.exampleSearchContainer}>
          <p className={styles.exampleSearch}>Например, </p>
          <Link to='/'><p className={`${styles.exampleSearch} ${styles.exampleSearchLink}`}>генеральная уборка</p></Link>
        </div>
      </div>
      <img className={styles.image} src="./banner-image.png" alt="big-man" />
    </div>
  );
};
