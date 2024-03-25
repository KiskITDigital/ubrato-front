import { FC } from 'react';
import qstyles from '../../questions.module.css';
// import { Link } from 'react-router-dom';
import { useQuestionBlock } from '../../../../store/questionsBlockStore';

export const WhatIs: FC = () => {

  const questionBlockStore = useQuestionBlock()

  // const { pageNumber, qusetionNumber, qustionsArr } = questionBlockStore
  const { handleQuestionNumber: setQuestionNumber } = questionBlockStore

  return (
    <div className={qstyles.container}>
      <p className={qstyles.startText}>
        Ubrato — это площадка для заказчиков и исполнителей клининговых и смежных услуг. Сайт
        работает в формате электронной торговой площадки. Сервис позволяет заказчикам находить
        исполнителей клининговых и смежных услуг с помощью тендеров, то есть торгов.
      </p>
      <p className={qstyles.title}>Преимущества Ubrato:</p>
      <ul>
        <li className={qstyles.li}>простота регистрации и сделок</li>
        <li className={qstyles.li}>надежность контрагентов и определение честного рейтинга</li>
        <li className={qstyles.li}>
          профессионализм исполнителей и качество оказываемых ими услуг
        </li>
        <li className={qstyles.li}>свобода заказчика и исполнителя в выборе партнера</li>
      </ul>
      <div className={qstyles.seeAlso}>
        <p className={qstyles.title}>Смотрите также:</p>
        <p className={`${qstyles.link} ${qstyles.ml20}`} onClick={() => { setQuestionNumber('5') }}>
          В чем отличия Ubrato от других агрегаторов и электронных торговых площадок?
        </p>
      </div>
    </div>
  );
};
