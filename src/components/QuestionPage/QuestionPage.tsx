import styles from './questionpage.module.css'
import React from 'react';
import { Flex, Segmented, Collapse, ConfigProvider, Space } from 'antd';

const text = `
  В нашем проекте каждый исполнитель проходит тщательную проверку. Ни один сомнительный кандидат не допускается на нашу площадку. Мы уделяем максимальное внимание безопасности на нашей площадке. Все переписки и личные данные надежно защищены. Площадка будет развиваться и улучшаться на постоянной основе.
`;

export const QuestionPage: FC = () => (
  <div className={`container ${styles.container}`}>
    <h2 className={styles.header}>
        Частые вопросы про <span className={styles.blueText}>Ubrato</span>
    </h2>
    <p className= {styles.greytext}> Мы постоянно пополняем базу знаний, основываясь на Ваших вопросах. </p>
    <div className={styles.btnsblock}>
          <button
            onClick={() => {
              handleInfo();
            }}
            className={`${styles.button}`}
          >
            Общие вопросы
          </button>
          <button
            onClick={() => {
              handleInfo();
            }}
            className={`${styles.button}`}
          >
            Исполнителю
          </button>
          <button
            onClick={() => {
              handleInfo();
            }}
            className={`${styles.button}`}
          >
            Заказчику
          </button>
        </div>
        <div className = {styles.pageQuestion}>
        <ConfigProvider
        theme={{
            components: {
              Collapse: {
                headerBg: '#FFFFFF'
              },
            },
            token: {
              colorBorder: '#FFFFFF',
              borderRadiusLG: '30px'
            },
          }}
        >
        <Space direction="vertical">
          <Collapse
            expandIconPosition = "end"
            collapsible="icon"
            defaultActiveKey={['0']}
            items={[
              {
                key: '1',
                label: <p className={styles.blacktext}>Почему такое название Ubrato?</p> ,
                children: <p className={styles.greytext}>{text}</p>,
              },
            ]}
          />
          <Collapse
            expandIconPosition = "end"
            collapsible="icon"
            defaultActiveKey={['1']}
            items={[
              {
                key: '1',
                label: <p className={styles.blacktext}>В чем отличие от других агрегаторов?</p>,
                children: <p className={styles.greytext}>{text}</p>,
              },
            ]}
          />
          <Collapse
            expandIconPosition = "end"
            collapsible="icon"
            defaultActiveKey={['0']}
            items={[
              {
                key: '1',
                label: <p className={styles.blacktext}>Что такое Ubrato.ru?</p>,
                children: <p className={styles.greytext}>{text}</p>,
              },
            ]}
          />
        </Space>
      </ConfigProvider>
     </div>
    </div>
  );


          