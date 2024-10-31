import { FC, useState } from 'react';
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from 'react-router-dom';
import Modal from '@/components/Modal';
import ContactModal from '@/components/Modal/ContactModal';
import { useUserInfoStore } from '@/store/userInfoStore';

const HowToBecome: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const userInfoStore = useUserInfoStore();

  return (
    <div className={qstyles.container}>
      <p className={qstyles.startText}>
        В качестве заказчика на сайте Ubrato могут зарегистрироваться действующие юридические лица,
        не находящееся в процедуре банкротства, на стадии ликвидации или в процессе присоединения к
        другому лицу с последующей ликвидацией.
      </p>
      <p className={`${qstyles.text}`}>
        На сервисе Ubrato осуществляется{' '}
        <Link
          className={`${qstyles.link}`}
          to={`${userInfoStore.isLoggedIn ? '/profile/documents' : '/registration'}`}
        >
          верификация
        </Link>{' '}
        документов юридического лица, после которой заказчику предоставляется возможность:
      </p>
      <ul>
        <li className={qstyles.li}>создавать тендеры на оказание клининговых и смежных услуг;</li>
        <li className={qstyles.li}>осуществлять поиск исполнителей и изучать их портфолио;</li>
        <li className={qstyles.li}> выбирать победителей тендеров.</li>
      </ul>
      <div className={qstyles.seeAlso}>
        <p className={qstyles.title}>Смотрите также:</p>
        <Link to="/faq?page=1&number=3#q1_3" className={`${qstyles.link} ${qstyles.ml20}`}>
          Какие требования предъявляются на Ubrato к заказчикам и исполнителям при регистрации?
        </Link>
        <Link to="/faq?page=3&number=4#q3_4" className={`${qstyles.link} ${qstyles.ml20}`}>
          Как создать тендер?
        </Link>
        <Link to="/faq?page=3&number=5#q3_5" className={`${qstyles.link} ${qstyles.ml20}`}>
          Как найти и выбрать исполнителя?
        </Link>
      </div>
      <p className={`${qstyles.text}`}>
        Остались вопросы?{' '}
        <span className={`${qstyles.link} cursor-pointer`} onClick={() => setOpenModal(true)}>
          Напишите телефон
        </span>{' '}
        и мы перезвоним.
      </p>
      <Modal isOpen={openModal}>
        <ContactModal type="SURVEY_TYPE_FEEDBACK" onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};

export default HowToBecome;
