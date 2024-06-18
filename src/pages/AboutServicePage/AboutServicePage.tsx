import { FC, useEffect, useRef } from 'react';
// import { 
//   MainBanner,
//   ExecutorsCatalog,
//   NewsBlock,
//   QuestionsBlock,
//   Seo,
// } from '@/components';
import { AboutHeader } from '@/components/AboutComponents/AboutHeader';
import { AboutDeveloping } from '@/components/AboutComponents/AboutDeveloping';
import { AboutTasks } from '@/components/AboutComponents/AboutTasks';
import { AboutOpportunities } from '@/components/AboutComponents/AboutOpportunities';
import { AboutUtils } from '@/components/AboutComponents/AboutUtil';
import { useLocation } from 'react-router-dom';

export const AboutServicePage: FC = () => {
  const location = useLocation()

  const startRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 300, behavior: "smooth" });
    }, 0);
  }, [location.state]);

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
