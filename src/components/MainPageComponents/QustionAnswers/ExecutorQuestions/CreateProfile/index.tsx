import { FC } from 'react';
import qstyles from '@/components/MainPageComponents/QustionAnswers/questions.module.css';
import { Link } from 'react-router-dom';

const CreateProfile: FC = () => {
  return (
    <div className={qstyles.container}>
      <p className={`${qstyles.startText}`}>
        Сайт Ubrato дает исполнителям клининговых и смежных услуг возможность расширить свою
        клиентскую базу, увеличить географию и объемы продаж.
      </p>
      <p className={`${qstyles.text}`}>
        Зайдите в личный кабинет и{' '}
        <Link to="/profile/contractor" className="text-accent">
          заполните ваш профиль
        </Link>
        . Расскажите об услугах, выполняемых вашей компанией, укажите их стоимость, перечислите
        регионы и объекты, где работают ваши сотрудники, отметьте преимущества и уникальные
        возможности.
      </p>
      <p className={`${qstyles.text}`}>
        Разместите описание вашей компании и фотографии с примерами работ. Эту презентацию увидят
        заказчики, когда будут искать исполнителя. Чем информативнее вы сделаете презентацию, тем
        больше вероятность получения заказов.
      </p>
      <div className={qstyles.seeAlso}>
        <p className={qstyles.title}>Смотрите также:</p>
        <Link to="/faq?page=2&number=1#q2_1" className={`${qstyles.link} ${qstyles.ml20}`}>
          Как стать исполнителем?
        </Link>
      </div>
    </div>
  );
};

export default CreateProfile;
