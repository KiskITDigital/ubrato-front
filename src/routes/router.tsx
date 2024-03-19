import { Route, Routes } from 'react-router-dom';
import { App } from '../components/App/App';
import { HomePage } from '../pages/HomePage/HomePage';
import { TendersPage } from '../pages/TendersPage/TendersPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';

// export const routes = [
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       { path: '', element: <HomePage /> },
//       { path: ':id', element: <HomePage /> },
//       {
//         path: 'tenders',
//         element: <TendersPage />,
//       },
//       {
//         path: 'register',
//         element: <RegisterPage />,
//       },
//       {
//         path: 'login',
//         element: <LoginPage />,
//       },
//     ],
//   },
// ];

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<HomePage />} />
        <Route path=":id" element={<HomePage />} />
        <Route path="tenders" element={<TendersPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};
