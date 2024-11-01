import { FC } from 'react';
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from 'react-router-dom';

export const WhatIs: FC = () => {
  return (
    <div className={qstyles.container}>
      <p className={qstyles.startText}>
        Ubrato — это площадка для заказчиков и исполнителей клининговых и смежных услуг.
      </p>
      <p className="mt-[15px]">
        Сайт работает в формате электронной торговой площадки. Сервис позволяет заказчикам находить
        исполнителей клининговых и смежных услуг с помощью тендеров, то есть торгов.
      </p>
      <p className="mt-[15px]">
        Все тендеры, проводимые на Ubrato, не регламентируются положениями 44-ФЗ и 223-ФЗ. Тендерная
        процедура на Ubrato проводится согласно{' '}
        <Link
          to="/documents/polzovatelskoe_soglashenie"
          className="text-accent"
          target="_blank"
        >
          Пользовательскому соглашению
        </Link>
        .
      </p>
      <p className={`${qstyles.title} mt-4`}>Преимущества Ubrato:</p>
      <ul>
        <li className={qstyles.li}>простота регистрации и сделок</li>
        <li className={qstyles.li}>надежность контрагентов</li>
        <li className={qstyles.li}>
          профессионализм исполнителей и качество оказываемых ими услуг
        </li>
        <li className={qstyles.li}>свобода заказчика и исполнителя в выборе партнера</li>
      </ul>
      <div className={qstyles.seeAlso}>
        <p className={qstyles.title}>Смотрите также:</p>
        <Link to="/faq?page=1&number=5#q1_5" className={`${qstyles.link} ${qstyles.ml20}`}>
          В чем отличия Ubrato от других агрегаторов и электронных торговых площадок?
        </Link>
      </div>
    </div>
  );
};
