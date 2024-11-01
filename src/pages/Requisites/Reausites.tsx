import { FC, useEffect, useRef } from 'react';
import styles from './requisites.module.css';

export const Requisites: FC = () => {
  const startRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 300, behavior: 'smooth' });
    }, 0);
  }, []);

  return (
    <div ref={startRef} className="container">
      <div className={styles.data}>
        <p className={styles.dataTitle}>Реквизиты ООО «ИНТЕГРАЦИЯ»</p>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>Полное наименование организации: </p>
          <p className={styles.dataBlockText}>
            Общество с ограниченной ответственностью «ИНТЕГРАЦИЯ»
          </p>
        </div>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>Сокращенное наименование организации:</p>
          <p className={styles.dataBlockText}>ООО «ИНТЕГРАЦИЯ»</p>
        </div>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>Юридический адрес:</p>
          <p className={styles.dataBlockText}>
            107140, г. Москва, вн.тер.г. Муниципальный округ Красносельский, ул. Краснопрудная, д.
            12/1, стр. 1, помещ. 1/6
          </p>
        </div>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>ИНН</p>
          <p className={styles.dataBlockText}>7708421320</p>
        </div>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>ОГРН</p>
          <p className={styles.dataBlockText}>1237700454815</p>
        </div>
        <div className={styles.dataBlock}>
          <p className={styles.dataBlockTitle}>Телефон</p>
          <p className={styles.dataBlockText}>+7-499-372-23-00</p>
        </div>
      </div>
    </div>
  );
};
