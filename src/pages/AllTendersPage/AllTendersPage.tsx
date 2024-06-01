import { TenderListHedaerComp } from '@/components/TenderListComponents/TenderHeaderComponent';
import { FC } from 'react';
import s from './styles.module.css'
import { TenderListComp } from '@/components/TenderListComponents/TenderListComponents';
import { MainFilterTender } from '@/components/TenderListComponents/TenderListCustomFilter';
import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';


export const AllTendersPage: FC = () => {
  return (
    <div className={s.main_blokkk}>
    <TenderListHedaerComp></TenderListHedaerComp>
    <TenderListCustomSearch></TenderListCustomSearch>
    <div className={s.block_container}>
        <MainFilterTender></MainFilterTender>
        <TenderListComp></TenderListComp>
    </div>
    </div>
  );
};
