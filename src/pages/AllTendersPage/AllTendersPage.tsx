import { TenderListHedaerComp } from '@/components/TenderListComponents/TenderHeaderComponent';
import { FC, useEffect } from 'react';
import s from './styles.module.css'
import { TenderListComp } from '@/components/TenderListComponents/TenderListComponents';
import { MainFilterTender } from '@/components/TenderListComponents/TenderListCustomFilter';
import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';
import { useNavigate } from 'react-router-dom';


export const AllTendersPage: FC = () => {

  const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/register')
    }, [navigate]);

  return (
    <div className={s.main_blokkk}>
    <TenderListHedaerComp></TenderListHedaerComp>
    <TenderListCustomSearch></TenderListCustomSearch>
    <div className={s.block_container}>
        <MainFilterTender></MainFilterTender>
        <TenderListComp myTender={false}></TenderListComp>
    </div>
    </div>
  );
};
