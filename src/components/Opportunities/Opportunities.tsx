import { FC, useState } from 'react';
import styles from './opportunities.module.css';
import { OpportunitiesCard } from '../OpportunitiesCard/OpportunutitesCard';

type InfoT = {
  title: string;
  image: string;
  text: string;
  btnText: string;
};

export const Opportunities: FC = () => {
  const Orderer: InfoT[] = [
    {
      title: 'Тендер',
      text: 'Создайте тендер, если хотите выбрать лучшее предложение среди откликов на вашу задачу',
      image: './tender-red.svg',
      btnText: 'Создать тендер',
    },
    {
      title: 'Каталог',
      text: 'Выберите исполнителя по профилю работ, портфолио, надежности и другим критериям',
      image: './catalog-purple.svg',
      btnText: 'Найти исполнителя',
    },
  ];

  const Executor: InfoT[] = [
    {
      title: 'Тендер',
      text: 'Откликайтесь на тендеры, обсуждайте условия в чате, предлагайте свою цену',
      image: './tender-red.svg',
      btnText: 'Найти тендер',
    },
    {
      title: 'Портфолио',
      text: 'Расскажите о возможностях и приемуществах вашей компании, получайте предложения от заказчиков',
      image: './catalog-purple.svg',
      btnText: 'Создать портфолио',
    },
  ];

  const [isOrderer, setIsOrderer] = useState(true);
  const [info, setInfo] = useState<InfoT[]>(Orderer);

  function handleInfo() {
    if (isOrderer) {
      setIsOrderer(false);
      setInfo(Executor);
    } else {
      setIsOrderer(true);
      setInfo(Orderer);
    }
  }

  return (
    <div className={`container ${styles.container}`}>
      <h2 className={styles.header}>
        Возможности <span className={styles.blueText}>Ubrato</span>
      </h2>
      <p className={styles.text}>
        Ubrato объединяет клининговые компании разного профиля и масштаба. Клининг офиса, высотные
        работы, уборка после стройки или мероприятия — найдите исполнителя удобным для вас способом.
      </p>
      <div className={styles.btnsContainer}>
        <button
          onClick={() => {
            handleInfo();
          }}
          disabled={isOrderer}
          className={`${styles.button}`}
        >
          Для заказчика
        </button>
        <button
          onClick={() => {
            handleInfo();
          }}
          disabled={!isOrderer}
          className={`${styles.button}`}
        >
          Для исполнителя
        </button>
      </div>
      <div className={styles.info}>
        {info.map((e, ix) => (
          <OpportunitiesCard
            key={ix}
            title={e.title}
            text={e.text}
            image={e.image}
            btnText={e.btnText}
          />
        ))}
      </div>
    </div>
  );
};
