import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/App/App';
import { HomePage } from '../pages/HomePage/HomePage';
import { TendersPage } from '../pages/TendersPage/TendersPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      {
        path: 'tenders',
        element: <TendersPage />,
      },
    ],
  },
]);
