import { FC, useEffect } from 'react';
import { Header } from '../Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '@/components';

export const App: FC = () => {
  const location = useLocation()
  useEffect(() => {
    console.log(location)
  }, [location]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
