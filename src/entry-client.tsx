import ReactDOM from 'react-dom/client';
import './index.css';
import './base.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/router.tsx';
import { NextUIProvider } from '@nextui-org/react';
// import { HomePage } from './pages/HomePage/HomePage.tsx';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,

  <NextUIProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </NextUIProvider>
);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <NextUIProvider>
//       <RouterProvider router={router} />
//     </NextUIProvider>
//   </React.StrictMode>
// );
