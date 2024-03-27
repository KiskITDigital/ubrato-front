import { FC } from 'react';
import { 
  MainBanner,
  ExecutorsCatalog,
  NewsBlock,
  QuestionsBlock,
  Seo,
  Opportunities,
  HowToFind,
  TendersAdvice
} from '@/components';
// import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
  return (
    <div>
      {/* <Link to="/faq?page=1&number=1#q1">questions</Link>
      <Link to="/faq?page=1&number=2#q2">questions2</Link>
      <Link to="/faq?page=1&number=3#q3">questions3</Link>
      <Link to="/faq">questions3</Link>
      <Link to="#q2">123</Link> */}
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
