import { FC, useEffect, useRef } from 'react';
import s from './styles.module.css'
import { TenderListComp } from '@/components/TenderListComponents/TenderListComponents';
import { MainFilterTender } from '@/components/TenderListComponents/TenderListCustomFilter';
// import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';
import FastFilterBlock from '@/components/FindExecutorComponents/FastFilter/FastFilter';
import { useTenderListState } from '@/store/tendersListStore';
import { useNavigate } from 'react-router-dom';
import { useUserInfoStore } from '@/store/userInfoStore';

export const AllTendersPage: FC = () => {
  const tenderListState = useTenderListState()
  const userInfoStore = useUserInfoStore()
  const startRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 200, behavior: "smooth" });
    }, 0);
  }, []);

  // const navigate = useNavigate()

  // useEffect(() => {
  //     if (!userInfoStore.isLoggedIn) {
  //         navigate('/login');
  //       }
  // }, [navigate]);


  return (
    <div ref={startRef} className={s.main_blokkk}>
      {/* <TenderListHedaerComp></TenderListHedaerComp> */}
      {/* <TenderListCustomSearch></TenderListCustomSearch> */}
      <FastFilterBlock title='тендера' values={tenderListState.fastFilterTexts} setValues={tenderListState.handleFastFilterTexts} />
      <div className={s.block_container}>
        <MainFilterTender></MainFilterTender>
        <TenderListComp myTender={false}></TenderListComp>
      </div>
    </div>
  );
};
