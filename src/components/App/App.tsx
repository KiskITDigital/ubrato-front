import { FC } from "react";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Cookies, Footer } from "@/components";
import { useAuthListener } from "@/api/auth/useAuthListener";

export const App: FC = () => {
  useAuthListener();
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
