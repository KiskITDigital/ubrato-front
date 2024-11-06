import { FC, ReactNode } from 'react';
import styles from './newsblock.module.css';
import { useUserInfoStore } from '@/store/userInfoStore';
import { useNavigate } from 'react-router-dom';

interface NewsItemProps {
  date: string;
  text: ReactNode;
  header: string;
  component?: ReactNode;
}

const news: NewsItemProps[] = [
  {
    header: 'Открыт сайт Ubrato',
    text: (
      <>
        <p className="text-[#666] text-[16px] mb-2">
          Агрегатор тендеров клининговых и смежных услуг Ubrato открыт*. Чтобы помочь клиентам
          максимально эффективно использовать сайт, за каждым из них с момента регистрации
          закрепляется персональный менеджер. Администрация сервиса уверена, что площадка станет
          удобным и полезным инструментом для бизнеса.
        </p>
        <p className="text-[#666] text-[16px] mb-2">
          * Слово «тендер» не подразумевает под собой проведение торгов в соответствии с ФЗ- 44 и
          ФЗ-223.{' '}
        </p>
      </>
    ),
    date: '01.09.2024',
  },
  {
    header: 'Участники тест-драйва Ubrato получат исследование рынка клининговых услуг',
    text: (
      <>
        <p className="text-[#666] text-[16px] mb-2">
          Администрация сервиса Ubrato проводит опрос исполнителей клининговых и смежных услуг.
          Расскажите о ваших первых впечатлениях от сайта. Какие инструменты оказались удобными и
          полезными, где нужны исправления, что вы предлагаете добавить?{' '}
        </p>
        <p className="text-[#666] text-[16px] mb-2">
          Поделитесь своим мнением, ответив на вопросы из анкеты. Это займет не более 10 минут.
        </p>
        <p className="text-[#666] text-[16px] mb-2">
          В знак благодарности за участие Ubrato подарит вам обзор рынка клининговых и смежных
          услуг.
        </p>
      </>
    ),
    date: '01.09.2024',
    component: (
      <button className="bg-[#007bff] text-[#fff] rounded-xl py-[10px] px-[20px] font-bold">
        Участвовать
      </button>
    ),
  },
];

const NewsItem: FC<NewsItemProps> = ({ date, text, header, component }) => {
  const userInfoStore = useUserInfoStore();
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f7f9] rounded-[30px] flex flex-col gap-4 p-[30px] w-[550px]">
      <h4 className="text-[20px] font-bold">{header}</h4>
      <div className="text-[#666] text-[14px]">{date}</div>
      <div>{text}</div>
      {component && (
        <div
          onClick={() => {
            if (userInfoStore.is_contractor) {
              navigate('/survey');
            } else {
              if (userInfoStore.isLoggedIn) {
                navigate('/profile/become-contractor');
              } else {
                navigate('/login');
              }
            }
          }}
          className="w-fit"
        >
          {component}
        </div>
      )}
    </div>
  );
};

export const NewsBlock: FC = () => (
  <div className={`container ${styles.container}`}>
    <div className={styles.newsBlock}>
      <h2 className={styles.header}>
        Новости <span className={styles.blueText}>Ubrato</span>
      </h2>
      <div className="flex justify-between gap-[30px]">
        {news.map((item, ix) => (
          <NewsItem
            key={ix}
            header={item.header}
            text={item.text}
            date={item.date}
            component={item.component}
          />
        ))}
      </div>
    </div>
  </div>
);
