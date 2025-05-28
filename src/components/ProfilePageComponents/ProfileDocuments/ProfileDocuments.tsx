import { FC, useEffect, useState } from "react";
import styles from "./profiledocuments.module.css";
import { FileInput } from "../FileInput/FileInput";
import { useProfileDocumentsStore } from "@/store/profileDocumentsStore";
import { verifyUser } from "@/api/verification";
import Modal from "@/components/Modal";
import ContactModal from "@/components/Modal/ContactModal";
import InfoModal from "@/components/Modal/InfoModal";
import { useUserInfoStore } from "@/store/userInfoStore";

export const ProfileDocuments: FC = () => {
  const profileDocuments = useProfileDocumentsStore();
  const fetchDocuments = profileDocuments.fetchDocuments;
  const [disabled, setDisabled] = useState(true);
  const userStore = useUserInfoStore();

  const isEmailVerified = userStore.user.email_verified;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDocuments();
  }, [fetchDocuments]);

  useEffect(() => {
    if (
      profileDocuments.documents.every(
        (document) => document.idFile && document.link
      )
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [profileDocuments.documents]);

  function handleUserVerify() {
    setDisabled(true);
    verifyUser(localStorage.getItem("token") || "").catch((error) => {
      console.log(error);
      setDisabled(false);
    });
  }
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openInfoModal, setOpenInfoModal] = useState(isEmailVerified);

  function closeInfoModal() {
    setOpenInfoModal(false);
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
          />
        );
      })}
      <div className={styles.checkContainer}>
        <button
          disabled={disabled}
          className={styles.send}
          onClick={handleUserVerify}
        >
          Отправить на верификацию
        </button>
        <p className={styles.help}>Есть вопросы по верификации?</p>
        <p className={styles.help}>
          <span className={styles.link} onClick={() => setOpenModal(true)}>
            Напишите
          </span>{" "}
          телефон и мы перезвоним.
        </p>
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
    </div>
  );
};
