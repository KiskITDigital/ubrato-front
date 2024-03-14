import { FC } from 'react';
import { Link } from 'react-router-dom';
import { MainBanner } from '../../components/MainBanner/MainBanner';
import { ExecutorsCatalog } from '../../components/ExecutorsCatalog/ExecutorsCatalog';
import { NewsMenu } from '../../components/NewsMenu/NewsMenu';
import { QuestionPage } from '../../components/QuestionPage/QuestionPage';
import { Seo } from '../../components/Seo/seo';
import { Opportunities } from '../../components/Opportunities/Opportunities';
import { HowToFind } from '../../components/HowToFind/HowToFind';
import { TendersAdvice } from '../../components/TendersAdvice/TendersAdvice';

export const HomePage: FC = () => {
  return (
    <div>
      <MainBanner />
      <ExecutorsCatalog />
      <Opportunities />
      <HowToFind />
      <TendersAdvice />
      <NewsMenu />
      <QuestionPage />
      <Seo />
      <Link to="/tenders">Tenders</Link>
    </div>
  );
};
