import { FC } from 'react';
import { MainBanner } from '../../components/MainBanner/MainBanner';
import { ExecutorsCatalog } from '../../components/ExecutorsCatalog/ExecutorsCatalog';
import { NewsBlock } from '../../components/NewsBlock/NewsBlock';
import { QuestionsBlock } from '../../components/QuestionsBlock/QuestionsBlock';
import { Seo } from '../../components/Seo/seo';
import { Opportunities } from '../../components/Opportunities/Opportunities';
import { HowToFind } from '../../components/HowToFind/HowToFind';
import { TendersAdvice } from '../../components/TendersAdvice/TendersAdvice';

export const HomePage: FC = () => {
  return (
    <div>
      {/* <Link to="/faq&page=1&number=1">questions</Link>
      <Link to="/faq&page=1&number=2">questions2</Link>
      <Link to="/faq&page=1&number=3">questions3</Link>
      <Link to="/faq&page=2&number=1">questions3</Link> */}
      <MainBanner />
      <ExecutorsCatalog />
      <Opportunities />
      <HowToFind />
      <TendersAdvice />
      <NewsBlock />
      <QuestionsBlock />
      <Seo />
    </div>
  );
};
