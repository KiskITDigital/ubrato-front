import { CreateTender } from "@/components/CreateTender/CreateTender";
import { useUserInfoStore } from "@/store/userInfoStore";
import { FC, useEffect, useState } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import Modal from "@/components/Modal";
import InfoModal from "@/components/Modal/InfoModal";

export const CreateTenderPage: FC = () => {
  const userInfoStore = useUserInfoStore();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const [showVerifyModal, setShowVerifyModal] = useState(false);

  function closeVerifyModal() {
    setShowVerifyModal(false);
    navigate("/profile/documents");
  }

  useEffect(() => {
    if (!userInfoStore.isLoggedIn) {
      if (navigationType === "POP") navigate(-1);
      else navigate("/login");
      return;
    }

    if (!userInfoStore.user.verified) {
      setShowVerifyModal(true);
      const timer = setTimeout(() => {
        setShowVerifyModal(false);
        navigate("/profile/documents");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [
    navigate,
    navigationType,
    userInfoStore.isLoggedIn,
    userInfoStore.user.verified,
  ]);

  if (!userInfoStore.isLoggedIn) {
    navigate("/login");
  }

  return (
    <>
      {userInfoStore.user.verified ? (
        <CreateTender />
      ) : (
        <Modal isOpen={showVerifyModal}>
          <InfoModal
            title=""
            text="Для создания тендера пройдите верификацию."
            onClose={closeVerifyModal}
          />
        </Modal>
      )}
    </>
  );
};
