import { FC, useEffect, useRef, useState } from 'react';
import s from './styles.module.css'
import { TenderListComp } from '@/components/TenderListComponents/TenderListComponents';
// import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "@/store/userInfoStore";
// import { set } from "date-fns";
import { DraftTenderComponent } from "@/components/DraftTenderComp";
import { TenderListCustomSearch } from "@/components/TenderListComponents/TenderListCustomSearch";

export const MyTendersPage: FC = () => {
  const navigate = useNavigate()
  const userInfoStore = useUserInfoStore()
  const [draftSwitch, setDraftSwitch] = useState(false);

  const startRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!userInfoStore.isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, userInfoStore.isLoggedIn]);

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 300, behavior: "smooth" });
    }, 0);
  }, []);

  const switchDraft = () => {
    if (draftSwitch) {
      setDraftSwitch(false);
      console.log(draftSwitch);
      
    } else {
      setDraftSwitch(true);
      console.log(draftSwitch);
    }
  };

  return (
    <div ref={startRef} className={s.main_blokkk}>
      <h1 className={s.title}>Мои тендеры</h1>
      <TenderListCustomSearch></TenderListCustomSearch>
      <div onClick={switchDraft}>{draftSwitch ? 'Открыть созданные тендеры' : 'Открыть черновики' }</div>
      {!draftSwitch ? (
        <TenderListComp myTender={true}></TenderListComp>
      ) : (
        <DraftTenderComponent></DraftTenderComponent>
      )}
      {/* <TenderListComp myTender={true}></TenderListComp> */}
    </div>
  );
};
