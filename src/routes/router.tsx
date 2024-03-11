import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/App/App';
import { HomePage } from '../pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      {
        path: 'tenders',
        element: (
          <div>
            <h1>Tenders</h1>
          </div>
        ),
      },
    ],
  },
]);
