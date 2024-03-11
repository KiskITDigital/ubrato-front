import { FC } from 'react';
import { Header } from '../Header/Hedaer';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';

export const App: FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
