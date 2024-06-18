import { FC } from 'react';
import { 
  MainBanner,
  ExecutorsCatalog,
  NewsBlock,
  QuestionsBlock,
  Seo,
} from '@/components';
import { AboutHeader } from '@/components/AboutComponents/AboutHeader';
import { AboutDeveloping } from '@/components/AboutComponents/AboutDeveloping';
import { AboutTasks } from '@/components/AboutComponents/AboutTasks';
import { AboutOpportunities } from '@/components/AboutComponents/AboutOpportunities';
import { AboutUtils } from '@/components/AboutComponents/AboutUtil';

export const AboutServicePage: FC = () => {
  return (
    <div>
      <AboutHeader/>
      <AboutDeveloping/>
      <AboutTasks/>
      <AboutOpportunities/>
      <AboutUtils/>
    </div>
  );
};
