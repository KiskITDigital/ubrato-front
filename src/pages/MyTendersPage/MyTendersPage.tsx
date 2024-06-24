import { FC, useEffect, useRef } from 'react';
import s from './styles.module.css'
import { TenderListComp } from '@/components/TenderListComponents/TenderListComponents';
// import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';
import { useNavigate } from 'react-router-dom';
import { useUserInfoStore } from '@/store/userInfoStore';


export const MyTendersPage: FC = () => {
  const navigate = useNavigate()
  const userInfoStore = useUserInfoStore()

  const startRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!userInfoStore.isLoggedIn) {
      navigate('/register');
    }
  }, [navigate, userInfoStore.isLoggedIn]);

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 300, behavior: "smooth" });
    }, 0);
  }, []);

  return (
    <div ref={startRef} className={s.main_blokkk}>
      <h1 className={s.title}>Мои тендеры</h1>
      {/* <TenderListCustomSearch></TenderListCustomSearch> */}
      <TenderListComp myTender={true}></TenderListComp>
    </div>
  );
};
