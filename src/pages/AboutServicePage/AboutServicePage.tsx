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
import { AboutHeader } from '@/components/AboutComponents/AboutHeader';
import { AboutDeveloping } from '@/components/AboutComponents/AboutDeveloping';
import { AboutTasks } from '@/components/AboutComponents/AboutTasks';
import { AboutOpportunities } from '@/components/AboutComponents/AboutOpportunities';
import { AboutUtils } from '@/components/AboutComponents/AboutUtil';

export const AboutServicePage: FC = () => {
  return (
    <div>
      {/* <MainBanner /> */}
      <AboutHeader/>
      {/* <ExecutorsCatalog /> */}
      <AboutDeveloping/>
      {/* <Opportunities /> */}
      <AboutTasks/>
      <AboutOpportunities/>
      <AboutUtils/>
      {/* <HowToFind /> */}
      {/* <TendersAdvice /> */}
      {/* <NewsBlock /> */}
      {/* <QuestionsBlock /> */}
      <Seo />
    </div>
  );
};
