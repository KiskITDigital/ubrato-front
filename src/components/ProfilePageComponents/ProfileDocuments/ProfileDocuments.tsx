import { FC, useEffect, useState } from "react";
import styles from "./profiledocuments.module.css";
import { FileInput } from "../FileInput/FileInput";
import { useProfileDocumentsStore } from "@/store/profileDocumentsStore";
import { getVerificationHistory, verifyUser } from "@/api/verification";
import Modal from "@/components/Modal";
import ContactModal from "@/components/Modal/ContactModal";
import InfoModal from "@/components/Modal/InfoModal";
import { useUserInfoStore } from "@/store/userInfoStore";

export const ProfileDocuments: FC = () => {
  const profileDocuments = useProfileDocumentsStore();
  const fetchDocuments = profileDocuments.fetchDocuments;
  const [disabled, setDisabled] = useState(true);
  const userStore = useUserInfoStore();

  const [isVerificationPending, setIsVerificationPending] = useState(false);
  // todo - вынести в какой то стор

  const isEmailVerified = userStore.user.email_verified;
  const isVerified = userStore.user.verified;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDocuments();

    getVerificationHistory(localStorage.getItem("token") || "").then(
      (history) => {
        const hasPendingVerification = history.some(
          (item) => item.verified === null && item.verified_at === null
        );
        setIsVerificationPending(hasPendingVerification);
      }
    );
  }, [fetchDocuments]);

  useEffect(() => {
    if (
      profileDocuments.documents.every(
        (document) => document.idFile && document.link
      ) &&
      !isVerificationPending
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [profileDocuments.documents, isVerificationPending]);

  function handleUserVerify() {
    setDisabled(true);
    verifyUser(localStorage.getItem("token") || "")
      .then(() => {
        setOpenVerifyModal(true);
        setIsVerificationPending(true);
      })
      .catch((error) => {
        console.log(error);
        setDisabled(false);
      });
  }
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openInfoModal, setOpenInfoModal] = useState(isEmailVerified);

  function closeInfoModal() {
    setOpenInfoModal(false);
  }

  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  function closeVerifyModal() {
    setOpenVerifyModal(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>Документы для верификации</h2>
        <p>Чтобы начать работу с тендерами пройдите верификацию.</p>
        <p className="mb-[25px]">
          Загрузите выписку из ЕГРЮЛ, карточку компании, документ,
          подтверждающий полномочия руководителя, Устав.{" "}
        </p>
        <p>
          Для успешного и оперативного прохождения верификации компании
          рекомендуем ознакомиться с нижеуказанной информацией по загрузке
          документов.
        </p>
        {isVerified && (
          <p className={styles.verifiedSuccess}>Верификация пройдена.</p>
        )}
      </div>
      {profileDocuments.documents.map((document) => {
        return (
          <FileInput
            key={document.id + document.header}
            id={document.id}
            header={document.header}
            text={document.text}
            type={document.type}
            link={document.link}
            idFile={document.idFile}
            isDisabled={isVerificationPending}
          />
        );
      })}
      <div className={styles.checkContainer}>
        {isVerificationPending && (
          <div className={styles.awaitingVerification}>
            <p>
              Документы успешно отправлены на верификацию. Дождитесь результата
              проверки.
            </p>
          </div>
        )}
        <button
          disabled={disabled || isVerificationPending}
          className={styles.send}
          onClick={handleUserVerify}
        >
          Отправить на верификацию
        </button>
        <div className={styles.helpContainer}>
          <p className={styles.help}>Есть вопросы по верификации?</p>
          <p className={styles.help}>
            <span className={styles.link} onClick={() => setOpenModal(true)}>
              Напишите
            </span>{" "}
            телефон и мы перезвоним.
          </p>
        </div>
      </div>
      <Modal isOpen={openModal}>
        <ContactModal
          type="SURVEY_TYPE_VERIFICATION"
          onClose={() => setOpenModal(false)}
        />
      </Modal>
      {!isEmailVerified && (
        <Modal isOpen={openInfoModal}>
          <InfoModal
            title=""
            text="Для завершения регистрации, пожалуйста, подтвердите адрес электронной почты."
            onClose={closeInfoModal}
          />
        </Modal>
      )}
      <Modal isOpen={openVerifyModal}>
        <InfoModal
          title=""
          text="Документы успешно отправлены на верификацию. Дождитесь результата проверки."
          onClose={closeVerifyModal}
        />
      </Modal>
    </div>
  );
};
