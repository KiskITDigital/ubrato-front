import { Route, Routes } from 'react-router-dom';
import { App } from '../components/App/App';
import { HomePage } from '../pages/HomePage/HomePage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { SurveyPage } from '@/pages/SurveyPage';
import { CreateTenderPage } from '@/pages/CreateTenderPage/CreateTenderPage';
import { OneTenderPageExecutor } from '@/pages/OneTenderPageExecutor/OneTenderPageExecutor';
import { Page1, ProfileDocuments, SurveyStart } from '@/components';
import { Page2 } from '@/components/SurveyComponents/Page2/Page2';
import { Page3 } from '@/components/SurveyComponents/Page3/Page3';
import { Page4 } from '@/components/SurveyComponents/Page4/Page4';
import { Page5 } from '@/components/SurveyComponents/Page5/Page5';
import { ProfileNotifications } from '@/components/ProfilePageComponents/ProfileNotifications/ProfileNotifications';
import { Help } from '@/components/ProfilePageComponents/Help/Help';
import { Company } from '@/components/ProfilePageComponents/Company/Company';
import { CompanyInfo } from '@/components/ProfilePageComponents/CompanyInfo/CompanyInfo';
import { AllTendersPage } from '@/pages/AllTendersPage/AllTendersPage';
import FindExecutor from '@/pages/FindExecutor/FindExecutor';
import { OrdererProfile } from '@/components/ProfilePageComponents/OrdererProfile/OrdererProfile';
import { ContractorProfile } from '@/components/ProfilePageComponents/ContractorProfile/ContractorProfile';
import { MyTendersPage } from '@/pages/MyTendersPage/MyTendersPage';
import FavoritePage from '@/pages/FavoritePage/FavoritePage';
import SettingsPage from '@/pages/SettingsPage/SettingsPage';
import { AboutServicePage } from '@/pages/AboutServicePage/AboutServicePage';
import OrganizationProfilePage from '@/pages/OrganizationProfilePage';
import ContactsPage from '@/pages/ContactsPage';
import { KnowledgeBasePage } from '@/pages/KnowledgeBasePage/KnowledgeBasePage';
import ConfirmEmailPage from '@/pages/ConfirmEmailPage';
import { BecomeContractor } from '@/components/ProfilePageComponents/BecomeContractor/BecomeContractor';
import { Requisites } from '@/pages/Requisites/Reausites';
import { ResetPassword } from '@/pages/ResetPassword/ResetPassword';
import { ForgotPassword } from '@/pages/ForgotPassword/ForgotPassword';
import { DocumentsPage } from '@/pages/DocumentsPage/DocumentsPage';
import { DocumentItem } from '@/components/DocumentItem/DocumentItem';
import { TenderTab } from '@/components/OneTenderComponents/TenderTab/TenderTab';
import { ResponsesTab } from '@/components/OneTenderComponents/ResponsesTab/ResponsesTab';
import { QATab } from '@/components/OneTenderComponents/QATab/QATab';
import { AdditionalInfo } from '@/components/OneTenderComponents/AdditionalInfo/AdditionalInfo';
import { OrdererProfileView } from '@/components/OrgnizationProfile/OrdererProfile/OrdererProfile';
import { ContractorProfileView } from '@/components/OrgnizationProfile/ContractorProfile/ContractorProfile';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<HomePage />} />
        <Route path="faq" element={<HomePage />} />
        <Route path="about" element={<AboutServicePage />} />
        <Route path="create-tender" element={<CreateTenderPage />} />
        <Route path="find-executor" element={<FindExecutor />} />
        <Route path="alltenders" element={<AllTendersPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegisterPage />} />
        <Route path="confirm-email" element={<ConfirmEmailPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="survey" element={<SurveyPage />}>
          <Route path="" element={<SurveyStart />} />
          <Route path="1" element={<Page1 />} />
          <Route path="2" element={<Page2 />} />
          <Route path="3" element={<Page3 />} />
          <Route path="4" element={<Page4 />} />
          <Route path="5" element={<Page5 />} />
        </Route>
        <Route path="profile" element={<ProfilePage />}>
          <Route path="favourite" element={<FavoritePage />} />
          <Route path="documents" element={<ProfileDocuments />} />
          <Route path="tenders" element={<MyTendersPage />}>
            <Route path="contractor" element={<MyTendersPage />} />
            <Route path="orderer" element={<MyTendersPage />} />
          </Route>
          <Route path="" element={<Company />}>
            <Route path="" element={<CompanyInfo />} />
            <Route path="contractor" element={<ContractorProfile />} />
            <Route path="orderer" element={<OrdererProfile />} />
          </Route>
          <Route path="become-contractor" element={<BecomeContractor />} />
          <Route path="notifications" element={<ProfileNotifications />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<Help />} />
        </Route>
        <Route path="/tender/:id" element={<OneTenderPageExecutor />}>
          <Route path="" element={<TenderTab />} />
          <Route path="responses" element={<ResponsesTab />} />
          <Route path="questions_and_answers" element={<QATab />} />
          <Route path="more_inforamtion" element={<AdditionalInfo />} />
        </Route>
        <Route path="knowledge-base" element={<KnowledgeBasePage />} />
        <Route path="organization/:org_id" element={<OrganizationProfilePage />}>
          <Route path="" element={<OrdererProfileView />} />
          <Route path="orderer" element={<OrdererProfileView />} />
          <Route path="contractor" element={<ContractorProfileView />} />
        </Route>
        <Route path="requisites" element={<Requisites />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="documents" element={<DocumentsPage />}>
          <Route path=":doc_id" element={<DocumentItem />} />
        </Route>
      </Route>
    </Routes>
  );
};
