import { FC } from 'react';
import styles from './questionpage.module.css';
import { Collapse } from 'antd';
import { ExpandButton } from '../ExpandButton/ExpandButton';

const text = `
  В нашем проекте каждый исполнитель проходит тщательную проверку. Ни один сомнительный кандидат не допускается на нашу площадку. Мы уделяем максимальное внимание безопасности на нашей площадке. Все переписки и личные данные надежно защищены. Площадка будет развиваться и улучшаться на постоянной основе.
`;

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
        collapsible="icon"
        expandIcon={ExpandButton}
        // defaultActiveKey={}
        items={[
          {
            key: '1',
            label: <p className={styles.blacktext}>Почему такое название Ubrato?</p>,
            children: <p className={styles.greytext}>{text}</p>,
          },
          {
            key: '2',
            label: <p className={styles.blacktext}>Почему такое название Ubrato?2</p>,
            children: <p className={styles.greytext}>{text}</p>,
          },
        ]}
      />
    </div>
  </div>
);
