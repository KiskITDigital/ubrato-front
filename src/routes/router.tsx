import { Route, Routes } from 'react-router-dom';
import { App } from '../components/App/App';
import { HomePage } from '../pages/HomePage/HomePage';
import { TendersPage } from '../pages/TendersPage/TendersPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { SurveyPage } from '@/pages/SurveyPage';
import { OneTenderPage } from '@/pages/OneTenderPage/OneTenderPage';

import { CreateTenderPage } from '@/pages/CreateTenderPage/CreateTenderPage';
import { OneTenderPageExecutor } from '@/pages/OneTenderPageExecutor/OneTenderPageExecutor';
import { Page1, ProfileDocuments, SurveyStart } from '@/components';
import { Page2 } from '@/components/SurveyComponents/Page2/Page2';
import { Page3 } from '@/components/SurveyComponents/Page3/Page3';
import { Page4 } from '@/components/SurveyComponents/Page4/Page4';
import { Page5 } from '@/components/SurveyComponents/Page5/Page5';
import { ProfileNotifications } from '@/components/ProfilePageComponents/ProfileNotifications/ProfileNotifications';
import { Help } from '@/components/ProfilePageComponents/Help/Help';
import { AllTendersPage } from '@/pages/AllTendersPage/AllTendersPage';


export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<HomePage />} />
        <Route path="faq" element={<HomePage />} />
        <Route path="create-tender" element={<CreateTenderPage />} />
        <Route path="tenders" element={<TendersPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="survey" element={<SurveyPage />}>
          <Route path="" element={<SurveyStart />} />
          <Route path="1" element={<Page1 />} />
          <Route path="2" element={<Page2 />} />
          <Route path="3" element={<Page3 />} />
          <Route path="4" element={<Page4 />} />
          <Route path="5" element={<Page5 />} />
        </Route>
        <Route path="profile" element={<ProfilePage />}>
          <Route path="favourite" element={<div>Избранное</div>} />
          <Route path="documents" element={<ProfileDocuments />} />
          <Route path="company" element={<div></div>} />
          <Route path="tenders" element={<div></div>} />
          <Route path="notifications" element={<ProfileNotifications />} />
          <Route path="settings" element={<div></div>} />
          <Route path="help" element={<Help />} />
        </Route>
        <Route path="testmytender" element={<OneTenderPage />} />
        <Route path="testmytenderexecutor" element={<OneTenderPageExecutor />} />
        <Route path="alltenders" element={<AllTendersPage />} />
      </Route>
    </Routes>
  );
};
