import { TenderListHedaerComp } from '@/components/TenderListComponents/TenderHeaderComponent';
import { FC } from 'react';
import s from './styles.module.css'
import { TenderListComp } from '@/components/TenderListComponents/TenderListComponents';


export const AllTendersPage: FC = () => {
  return (
    <div className={s.block_container}>
        <TenderListHedaerComp></TenderListHedaerComp>
        <TenderListComp></TenderListComp>
    </div>
  );
};
