import { TenderListHedaerComp } from '@/components/TenderListComponents/TenderHeaderComponent';
import { FC } from 'react';
import s from './styles.module.css'
import { TenderListComp } from '@/components/TenderListComponents/TenderListComponents';
import { MainFilterTender } from '@/components/TenderListComponents/TenderListCustomFilter';
// import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';
import FastFilterBlock from '@/components/FindExecutorComponents/FastFilter/FastFilter';
import { useTenderListState } from '@/store/tendersListStore';


export const AllTendersPage: FC = () => {
  const tenderListState = useTenderListState()

  return (
    <div className={s.main_blokkk}>
      <TenderListHedaerComp></TenderListHedaerComp>
      {/* <TenderListCustomSearch></TenderListCustomSearch> */}
      <FastFilterBlock values={tenderListState.fastFilterTexts} setValues={tenderListState.handleFastFilterTexts} />
      <div className={s.block_container}>
        <MainFilterTender></MainFilterTender>
        <TenderListComp myTender={false}></TenderListComp>
      </div>
    </div>
  );
};
