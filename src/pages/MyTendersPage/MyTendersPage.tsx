import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserInfoStore } from "@/store/userInfoStore";
import { MyTenders } from "@/components/TenderListComponents/MyTenders/MyTenders";

export const MyTendersPage: FC = () => {
  const navigate = useNavigate();
  const userInfoStore = useUserInfoStore();
  const [draftSwitch, setDraftSwitch] = useState(false);

  const startRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!userInfoStore.isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, userInfoStore.isLoggedIn]);

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 300, behavior: "smooth" });
    }, 0);
  }, []);

  return (
    <div ref={startRef} className="container">
      <h1 className={s.title}>Мои тендеры</h1>
      <Link className="mb-3 mt-3 block text-[20px] text-accent underline" to="/profile">Ваш профиль</Link>
      <p
        onClick={() => setDraftSwitch(!draftSwitch)}
        className="cursor-pointer text-accent underline"
      >
        {draftSwitch ? "Открыть созданные тендеры" : "Открыть черновики"}
      </p>
      <MyTenders drafts={draftSwitch} />
    </div>
  );
};
