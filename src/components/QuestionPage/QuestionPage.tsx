import { FC } from 'react';
import styles from './questionpage.module.css';
import { Collapse } from 'antd';
import { ExpandButton } from '../ExpandButton/ExpandButton';
import { generalQuestions } from '../../textData/questionsData';

export const QuestionPage: FC = () => (
  <div className={`container ${styles.container}`}>
    <h2 className={styles.header}>
      Частые вопросы про <span className={styles.blueText}>Ubrato</span>
    </h2>
    <p className={styles.greytext}>
      {' '}
      Мы постоянно пополняем базу знаний, основываясь на Ваших вопросах.{' '}
    </p>
    <div className={styles.btnsblock}>
      <button className={`${styles.button}`}>Общие вопросы</button>
      <button className={`${styles.button}`}>Исполнителю</button>
      <button className={`${styles.button}`}>Заказчику</button>
    </div>
    <div className={styles.pageQuestion}>
      <Collapse
        className={styles.accordion}
        expandIconPosition="end"
        collapsible="header"
        expandIcon={ExpandButton}
        defaultActiveKey={['1']}
        items={generalQuestions.map((e, ix) => {
          return {
            key: `${ix+1}`,
            label: <p className={styles.blacktext}>{e.title}</p>,
            children: e.textComponent,
          };
        })}
      />
    </div>
  </div>
);
