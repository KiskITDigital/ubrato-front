import { FC, useState } from 'react';
import styles from './opportunities.module.css';
import { OpportunitiesCard } from '@/components';
import { useIsOrdererState } from '@/store/isOrdererStore';
import { Executor, OpportunitiesInfoT, Orderer } from '@/textData/textData';

export const Opportunities: FC = () => {
  const ordererState = useIsOrdererState();
  const [info, setInfo] = useState<OpportunitiesInfoT[]>(Orderer);

  function handleInfo() {
    if (ordererState.isOrderer) {
      ordererState.handleState();
      setInfo(Executor);
    } else {
      ordererState.handleState();
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
          disabled={ordererState.isOrderer}
          className={`${styles.button}`}
        >
          Для заказчика
        </button>
        <button
          onClick={() => {
            handleInfo();
          }}
          disabled={!ordererState.isOrderer}
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
