import { Route, Routes } from 'react-router-dom';
import { App } from '../components/App/App';
import { HomePage } from '../pages/HomePage/HomePage';
import { TendersPage } from '../pages/TendersPage/TendersPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';

import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { SurveyPage } from '@/pages/SurveyPage';
import { Page1, SurveyStart } from '@/components';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<HomePage />} />
        <Route path="faq" element={<HomePage />} />
        <Route path="tenders" element={<TendersPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="survey" element={<SurveyPage />}>
          <Route path="" element={<SurveyStart />} />
          <Route path="1" element={<Page1 />} />
        </Route>
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};
