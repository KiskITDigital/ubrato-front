import { FC } from 'react';
import qstyles from '../../questions.module.css';
import { Link } from 'react-router-dom';
import { useQuestionBlock } from '../../../../store/questionsBlockStore';
import { executorQustions, ordererQustions } from '../../../../textData/questionsData';

export const HowToRegister: FC = () => {
  const questionBlockStore = useQuestionBlock()

  // const { pageNumber, qusetionNumber, qustionsArr } = questionBlockStore
  const { handlePageNumber: setPageNumber, handleQuestionNumber: setQuestionNumber, handleQuestionsArr: setQuestionArr } = questionBlockStore
  return (
    <div className={qstyles.container}>
      <p className={qstyles.startText}>
        Чтобы начать работу на площадке, пройдите процедуру регистрации. Подключение пользователей к
        сервису организовано в три этапа: Регистрация Верификация Модерация
      </p>
      <p className={qstyles.title}>1. Регистрация</p>
      <p className={`${qstyles.text} ${qstyles.ml20}`}>
        Заполните <Link className={qstyles.link} to="/register">регистрационную форму</Link>. Зарегистрироваться могут только юридические лица. В
        качестве исполнителей могут регистрироваться только компании с видом деятельности,
        относящемся к клинингу или к смежным услугам.
      </p>
      <p className={qstyles.title}>2. Верификация</p>
      <p className={`${qstyles.text} ${qstyles.ml20}`}>
        Загрузите документы компании. Ссылка на форму для загрузки документов расположена в личном
        кабинете во вкладке Верификация.
      </p>
      <p className={qstyles.title}>3. Модерация</p>
      <p className={`${qstyles.text} ${qstyles.ml20}`}>
        Заявка на создание аккаунта будет оперативно рассмотрена модератором сайта. Не более чем в
        течение суток с момента подачи документов компании вы получите уведомление о результате
        рассмотрения по электронной почте и в личном кабинете. Если в заявке есть необходимые
        данные, вам будет доступен весь функционал сайта.
      </p>
      <div className={qstyles.seeAlso}>
        <p className={qstyles.title}>Смотрите также:</p>
        <p className={`${qstyles.link} ${qstyles.ml20}`} onClick={() => { setQuestionNumber('3') }}>
          Какие требования предъявляются на Ubrato к заказчикам и исполнителям при регистрации?
        </p>
        <p className={`${qstyles.link} ${qstyles.ml20}`} onClick={() => { setQuestionNumber('1'); setPageNumber('3'); setQuestionArr(ordererQustions) }}>Как стать заказчиком?</p>
        <p className={`${qstyles.link} ${qstyles.ml20}`} onClick={() => { setQuestionNumber('1'); setPageNumber('2'); setQuestionArr(executorQustions) }}>Как стать исполнителем?</p>
      </div>
      <p className={`${qstyles.text}`}>Остались вопросы? <span onClick={() => alert('smth?')} className={`${qstyles.link}`}>Напишите телефон</span> и мы перезвоним.</p>
    </div>
  );
};
