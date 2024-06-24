import { FC, useEffect, useState } from "react";
import s from "./styles.module.css";
import { TenderListComp } from "@/components/TenderListComponents/TenderListComponents";
// import { TenderListCustomSearch } from '@/components/TenderListComponents/TenderListCustomSearch';
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "@/store/userInfoStore";
// import { set } from "date-fns";
// import { DraftTenderComponent } from "@/components/DraftTenderComp";

export const MyTendersPage: FC = () => {
  const [draftSwitch, setDraftSwitch] = useState(false);
  const navigate = useNavigate();
  const userInfoStore = useUserInfoStore();
  useEffect(() => {
    if (!userInfoStore.isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, userInfoStore.isLoggedIn]);

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
    <div className={s.main_blokkk}>
      <h1 className={s.title}>Мои тендеры</h1>
      {/* <TenderListCustomSearch></TenderListCustomSearch> */}

      {/* <div onClick={switchDraft}>drafts</div>
      {!draftSwitch ? (
        <TenderListComp myTender={true}></TenderListComp>
      ) : (
        <DraftTenderComponent></DraftTenderComponent>
      )} */}
      <TenderListComp myTender={true}></TenderListComp>
    </div>
  );
};
