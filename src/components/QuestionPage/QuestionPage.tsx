import { FC, useEffect, useRef, useState } from 'react';
import styles from './questionpage.module.css';
import { Collapse } from 'antd';
import { ExpandButton } from '../ExpandButton/ExpandButton';
import { executorQustions, generalQuestions, ordererQustions } from '../../textData/questionsData';
import { useParams } from 'react-router-dom';

export const QuestionPage: FC = () => {
  const questions = useRef<HTMLDivElement>(null);

  const params = useParams();
  const [qusetionNumber, setQuestionNumber] = useState('1');
  const [pageNumber, setPageNumber] = useState('1');
  const [qustionsArr, setQuestionArr] = useState(generalQuestions);

  useEffect(() => {
    if (params.id) {
      if (params.id === 'faq') {
        window.scrollTo(0, questions.current!.offsetTop);
      } else if (params.id.includes('faq')) {
        window.scrollTo(0, questions.current!.offsetTop);
        setQuestionNumber(params.id.slice(-1));
        const pageNumber = params.id.slice(9, 10);
        setPageNumber(pageNumber);
        if (pageNumber === '1') {
          setQuestionArr(generalQuestions);
        } else if (pageNumber === '2') {
          setQuestionArr(executorQustions);
        } else if (pageNumber === '3') {
          setQuestionArr(ordererQustions);
        }
      }
    }
  }, [params]);

  return (
    <div className={`container ${styles.container}`}>
      <h2 className={styles.header}>
        Частые вопросы про <span className={styles.blueText}>Ubrato</span>
      </h2>
      <p className={styles.greytext}>
        {' '}
        Мы постоянно пополняем базу знаний, основываясь на Ваших вопросах.{' '}
      </p>
      <div ref={questions} className={styles.btnsblock}>
        <button
          disabled={pageNumber === '1'}
          onClick={() => {
            setPageNumber('1');
            setQuestionArr(generalQuestions);
          }}
          className={`${styles.button}`}
        >
          Общие вопросы
        </button>
        <button
          onClick={() => {
            setPageNumber('2');
            setQuestionArr(executorQustions);
          }}
          disabled={pageNumber === '2'}
          className={`${styles.button}`}
        >
          Исполнителю
        </button>
        <button
          onClick={() => {
            setPageNumber('3');
            setQuestionArr(ordererQustions);
          }}
          disabled={pageNumber === '3'}
          className={`${styles.button}`}
        >
          Заказчику
        </button>
      </div>
      <div className={styles.pageQuestion}>
        <Collapse
          className={styles.accordion}
          expandIconPosition="end"
          collapsible="header"
          expandIcon={ExpandButton}
          defaultActiveKey={['1']}
          activeKey={[qusetionNumber]}
          onChange={(e) => {
            setQuestionNumber(e[1]);
          }}
          items={qustionsArr.map((e, ix) => {
            return {
              key: `${ix + 1}`,
              label: <p className={styles.blacktext}>{e.title}</p>,
              children: e.textComponent,
            };
          })}
        />
      </div>
    </div>
  );
};
