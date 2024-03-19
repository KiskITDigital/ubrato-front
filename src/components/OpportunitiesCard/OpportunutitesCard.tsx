import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './opportunitiescard.module.css';

type PropsT = {
  image: string;
  title: string;
  text: string;
  btnText: string;
};

export const OpportunitiesCard: FC<PropsT> = ({ image, title, text, btnText }) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <img className={styles.image} src={image} alt="pic" />
          <h3>{title}</h3>
        </div>
        <p className={styles.cardText}>{text}</p>
      </div>
      <Link to="/" className={styles.btn}>
        <p className={styles.btnText}>{btnText}</p>
        <img src="./arrow-with-line-right.svg" alt="arrow" />
      </Link>
    </div>
  );
};
