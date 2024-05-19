import { FC } from 'react';
import styles from './companyinfo.module.css';

export const CompanyInfo: FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Публичная информация о компании</h2>
      <div className={styles.infoContainer}>
        <img src="/info-ic.svg" alt="" />
        <p className={styles.infoText}>
          Вся информация с этой страницы будет опубликована в публичном профиле вашей компании за
          исключением контактов. Их ваши контрагенты увидят после подведения итогов тендера.
        </p>
      </div>
    </div>
  );
};
