import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/App/App';
import { HomePage } from '../pages/HomePage/HomePage';
import { TendersPage } from '../pages/TendersPage/TendersPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: ':id', element: <HomePage /> },
      {
        path: 'tenders',
        element: <TendersPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);
