import { FC, useRef } from 'react';
import styles from './portfolio.module.css';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

export const Portfolio: FC = () => {
  const windowRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container}>
      <p className={styles.header}>Портфолио</p>
      <div className={styles.infoContainer}>
        <img src="/info-blue-ic.svg" alt="" />
        <p className={styles.infoTextBig}>
          Разместите фотографии с примерами работ вашей компании и напишите описание
        </p>
      </div>
      <Popover
        portalContainer={windowRef.current ?? document.body}
        shouldBlockScroll
        backdrop="blur"
      >
        <PopoverTrigger>
          <button className={styles.btn}>
            <img className={styles.btnImg} src="/add-file-ic.svg" alt="" />
            <div ref={windowRef} className={styles.btnText}>
              <p className={styles.btnTextBig}>Добавить работы</p>
              <p className={styles.count}>Можно загрузить до 10 шт.</p>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className={styles.form}>123</div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
