import { FC, useEffect } from 'react';
import s from './styles.module.css'
import { TenderListComp } from '@/components/TenderListComponents/TenderListComponents';
import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';
import { useNavigate } from 'react-router-dom';


export const MyTendersPage: FC = () => {
  const navigate = useNavigate() 
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/register')
}, [navigate]);
  return (
    <div className={s.main_blokkk}>
    <TenderListCustomSearch></TenderListCustomSearch>
        <TenderListComp myTender={true}></TenderListComp>
    </div>
  );
};
