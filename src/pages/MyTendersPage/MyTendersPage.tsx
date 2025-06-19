import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.css";
import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { useUserInfoStore } from "@/store/userInfoStore";
import { MyTenders } from "@/components/TenderListComponents/MyTenders/MyTenders";
import Modal from "@/components/Modal";
import InfoModal from "@/components/Modal/InfoModal";

export const MyTendersPage: FC = () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const userInfoStore = useUserInfoStore();
  const [draftSwitch, setDraftSwitch] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  function closeVerifyModal() {
    setShowVerifyModal(false);
    navigate("/profile/documents");
  }

  const startRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!userInfoStore.isLoggedIn) {
      if (navigationType === "POP") navigate(-1);
      else navigate("/login");
    }
  }, [navigate, userInfoStore.isLoggedIn, navigationType]);

  useEffect(() => {
    if (!userInfoStore.user.verified) {
      setShowVerifyModal(true);
      const timer = setTimeout(() => {
        setShowVerifyModal(false);
        navigate("/profile/documents");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [navigate, userInfoStore.user.verified]);

  useEffect(() => {
    startRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const elementTop = startRef.current?.getBoundingClientRect().top;
      if (elementTop) {
        window.scrollBy({ top: elementTop - 300, behavior: "smooth" });
      }
    }, 0);
  }, []);

  if (!userInfoStore.isLoggedIn) {
    return null;
  }

  return (
    <div ref={startRef} className="container">
      <h1 className={s.title}>Мои тендеры</h1>
      <Link
        className="mb-3 mt-3 block text-[16px] text-accent underline"
        to="/profile"
      >
        Личный кабинет
      </Link>
      <p
        onClick={() => setDraftSwitch(!draftSwitch)}
        className="cursor-pointer text-accent underline"
      >
        {draftSwitch ? "Открыть созданные тендеры" : "Открыть черновики"}
      </p>
      <MyTenders drafts={draftSwitch} />

      {!userInfoStore.user.verified && (
        <Modal isOpen={showVerifyModal}>
          <InfoModal
            title=""
            text="Для просмотра тендеров необходимо пройти верификацию."
            onClose={closeVerifyModal}
          />
        </Modal>
      )}
    </div>
  );
};
