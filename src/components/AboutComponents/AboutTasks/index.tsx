import { FC, useEffect, useState } from 'react';
import styles from './style.module.css';
import { OpportunitiesCard } from '@/components';
import { useIsOrdererState } from '@/store/isOrdererStore';
import { Executor, OpportunitiesInfoT, Orderer } from '@/textData/textData';
import { useUserInfoStore } from '@/store/userInfoStore';

export const AboutTasks: FC = () => {
  const ordererState = useIsOrdererState();
  const userState = useUserInfoStore();
  const [info, setInfo] = useState<OpportunitiesInfoT[]>(Orderer);

  function handleInfo() {
    if (ordererState.role === 'orderer') {
      ordererState.handleState('contractor');
      setInfo(Executor);
    } else {
      ordererState.handleState('orderer');
      setInfo(Orderer);
    }
  }

  useEffect(() => {
    if (userState.user.is_contractor) {
      setInfo(Executor);
    } else setInfo(Orderer);
  }, [userState.user.is_contractor]);

  return (
    <div className={`container ${styles.container}`}>
      <h2 className={styles.header}>
        Какие задачи решает <span className={styles.blueText}>Ubrato</span>
      </h2>
      <div className={styles.btnsContainer}>
        <button
          onClick={() => {
            handleInfo();
          }}
          disabled={ordererState.role === 'orderer'}
          className={`${styles.button}`}
        >
          Для заказчика
        </button>
        <button
          onClick={() => {
            handleInfo();
          }}
          disabled={ordererState.role === 'contractor'}
          className={`${styles.button}`}
        >
          Для исполнителя
        </button>
      </div>
      { ordererState.role === 'orderer' && (<div className={styles.develop_container}>
        <h2 className={styles.develop_header}>
        <span className={styles.blueText}>Ubrato</span> поможет
        </h2>
        <div className={styles.develop_list}> 
            <div className={styles.list_elem}><img src="./arrow.png" alt="" /> <p>Сориентироваться на рынке клининга</p></div>
            <div className={styles.list_elem}><img src="./person.png" alt="" /> <p>Найти нового подрядчика 
для вашей организации</p></div>
            <div className={styles.list_elem}><img src="./graphs.png" alt="" /> <p>Быть в курсе актуальных 
цен на услуги клининга</p></div>
        </div>
        </div>
    )}
      
      { ordererState.role === 'contractor' && (<div className={styles.develop_container}>
        <h2 className={styles.develop_header}>
        <span className={styles.blueText}>Ubrato</span> поможет
        </h2>
        <div className={styles.develop_list}> 
            <div className={styles.list_elem}><img src="./person.png" alt="" /> <p>Найти новых клиентов</p></div>
            <div className={styles.list_elem}><img src="./likes.png" alt="" /> <p>Заработать репутацию надёжного партнёра</p></div>
            <div className={styles.list_elem}><img src="./graphs.png" alt="" /> <p>Сравнить себя с конкурентами</p></div>
        </div>
        </div>
    )}
    </div>
  );
};
