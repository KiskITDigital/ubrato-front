// import { ReactNode } from 'react';
import { WhatIs } from '../components/QustionAnswers/GeneralQuestions/WhatIs/WhatIs';
import { HowToRegister } from '../components/QustionAnswers/GeneralQuestions/HowToRegister/HowToRegister';
import Requirements from '../components/QustionAnswers/GeneralQuestions/Requirements';
import HowToBecome from '../components/QustionAnswers/CustomerQuestions/HowToBecome';
import HowToBecomeExecutor from '../components/QustionAnswers/ExecutorQuestions/HowToBecome';
import Services from '../components/QustionAnswers/CustomerQuestions/Services';
import WhatObjects from '../components/QustionAnswers/CustomerQuestions/WhatObjects';
import CreateTender from '../components/QustionAnswers/CustomerQuestions/CreateTender';
import FindAndChoose from '../components/QustionAnswers/CustomerQuestions/FindAndChoose';
import Payment from '../components/QustionAnswers/GeneralQuestions/Payment';
import Differences from '../components/QustionAnswers/GeneralQuestions/Differences';
import CreateProfile from '../components/QustionAnswers/ExecutorQuestions/CreateProfile';
import WhatOrders from '../components/QustionAnswers/ExecutorQuestions/WhatOrders';
import RespondTender from '../components/QustionAnswers/ExecutorQuestions/RespondTender';
import { QuestionT } from '../types/app';

export const generalQuestions: QuestionT[] = [
  {
    title: 'Что такое Ubrato?',
    textComponent: <WhatIs />,
  },
  {
    title: 'Как зарегистрироваться на сайте Ubrato?',
    textComponent: <HowToRegister />,
  },
  {
    title: 'Какие требования предъявляются на Ubrato к заказчикам и исполнителям при регистрации?',
    textComponent: (
      <div style={{ marginTop: '30px' }}>
        <Requirements />
      </div>
    ),
  },
  {
    title: 'Взимает ли Ubrato плату с пользователей?',
    textComponent: <Payment />,
  },
  {
    title: 'В чем отличия Ubrato от других агрегаторов и электронных торговых площадок?',
    textComponent: <Differences />,
  },
];

export const executorQustions: QuestionT[] = [
  {
    title: 'Как стать исполнителем?',
    textComponent: <HowToBecomeExecutor />,
  },
  {
    title: 'Как и зачем оформлять профиль и портфолио?',
    textComponent: <CreateProfile />,
  },
  {
    title: 'Заказы на какие услуги можно получить на Ubrato?',
    textComponent: <WhatOrders />,
  },
  {
    title: 'Как откликнуться на тендер?',
    textComponent: <RespondTender />,
  },
];

export const ordererQustions: QuestionT[] = [
  {
    title: 'Как стать заказчиком?',
    textComponent: <HowToBecome />,
  },
  {
    title: 'Какие услуги можно заказать на Ubrato?',
    textComponent: <Services />,
  },
  {
    title: 'Клининг каких объектов можно заказать на Ubrato?',
    textComponent: <WhatObjects />,
  },
  {
    title: 'Как создать тендер?',
    textComponent: <CreateTender />,
  },
  {
    title: 'Как найти и выбрать исполнителя?',
    textComponent: <FindAndChoose />,
  },
];
