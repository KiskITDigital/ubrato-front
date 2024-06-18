import { FC, useEffect } from 'react';
import s from './styles.module.css'
import { TenderListComp } from '@/components/TenderListComponents/TenderListComponents';
import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';
import { useNavigate } from 'react-router-dom';
import { useUserInfoStore } from '@/store/userInfoStore';


export const MyTendersPage: FC = () => {
  const navigate = useNavigate() 
  const userInfoStore = useUserInfoStore()
  useEffect(() => {
    if (!userInfoStore.isLoggedIn) {
        navigate('/register');
      }
}, [navigate]);
  return (
    <div className={s.main_blokkk}>
    <TenderListCustomSearch></TenderListCustomSearch>
        <TenderListComp myTender={true}></TenderListComp>
    </div>
  );
};
