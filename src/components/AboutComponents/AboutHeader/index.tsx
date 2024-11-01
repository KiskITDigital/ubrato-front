import { FC } from 'react';
import styles from './style.module.css';

export const AboutHeader: FC = () => {
  return (
    <div className={`container ${styles.mobileContainer}`}>
      <div className={` ${styles.container}`}>
        <div>
          <h1 className={styles.header}>
            {/* <span className={styles.blueText}>Весь рынок</span> клининга на одной площадке */}О
            сервисе <span className={styles.blueText}>Ubrato</span>
          </h1>
          <p className={styles.agregator}>
            {' '}
            <span className={styles.blueText}>Ubrato</span> — площадка для заказчиков и исполнителей
            клининговых услуг. <span className={styles.span_marginBlock}></span>
            Мы создали сервис <span className={styles.blueText}>Ubrato</span>, чтобы рынок клининга
            стал чище, а поиск партнёров быстрее и легче.
          </p>
          <p className='text-[24px] w-[703px] mt-2 font-medium'>
            Чтобы быть уверенными в профессиональном и успешном опыте контрагентов, высоком качестве
            оказываемых ими клининговых и смежных услуг, на Сервисе Ubrato регистрируются
            исключительно действующие юридические лица.{' '}
          </p>
          <p className='text-[24px] w-[703px] mt-2 font-medium'>
            Наша миссия заключается в создании пространства, где качество и доверие являются
            важнейшими принципами.
          </p>
        </div>
        <img className={styles.image} src="./muzhik.png" alt="big-muzhik" />
      </div>
    </div>
  );
};
