import { FC, ReactNode } from 'react';
import styles from './newsblock.module.css';
import { useUserInfoStore } from '@/store/userInfoStore';
import { useNavigate } from 'react-router-dom';

interface NewsItemProps {
  date: string;
  text: string;
  header: string;
  component?: ReactNode;
}

const news: NewsItemProps[] = [
  {
    header: 'Открыт сайт Ubrato',
    text: 'Агрегатор клининговых услуг Ubrato открыт. Команда проекта уверена, что площадка станет удобным и полезным инструментом для бизнеса. За каждым пользователем закрепляется персональный менеджер, который поможет с регистрацией и проведением тендеров.',
    date: '01.09.2024',
  },
  {
    header: 'Участники тест-драйва Ubrato получат исследование рынка клининговых услуг',
    text: 'Ubrato предлагает представителям компаний, зарегистрированным на площадке в качестве исполнителей, принять участие в тест-драйве сайта. Протестируйте площадку, ответьте на вопросы анкеты, и мы предоставим вам исследование рынка клининговых услуг.',
    date: '01.09.2024',
    component: (
      <button className="bg-[#007bff] text-[#fff] rounded-xl py-[10px] px-[20px] font-bold">
        Принять участие
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
      <div className="text-[#666] text-[16px]">{text}</div>
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
