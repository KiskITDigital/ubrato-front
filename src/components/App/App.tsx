import { FC } from 'react';
import { Header } from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { Cookies, Footer } from '@/components';

export const App: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Cookies />
      <Footer />
    </>
  );
};
