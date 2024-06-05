import { FC } from 'react';
import s from './styles.module.css'
import { TenderListComp } from '@/components/TenderListComponents/TenderListComponents';
import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';


export const MyTendersPage: FC = () => {
  return (
    <div className={s.main_blokkk}>
    <TenderListCustomSearch></TenderListCustomSearch>
        <TenderListComp></TenderListComp>
    </div>
  );
};
