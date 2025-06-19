import { FC, useEffect, useState } from "react";
import styles from "./profiledocuments.module.css";
import { FileInput } from "../FileInput/FileInput";
import { useProfileDocumentsStore } from "@/store/profileDocumentsStore";
import Modal from "@/components/Modal";
import ContactModal from "@/components/Modal/ContactModal";
import InfoModal from "@/components/Modal/InfoModal";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useVerificationStore } from "@/store/verificationStore";

export const ProfileDocuments: FC = () => {
  const profileDocuments = useProfileDocumentsStore();
  const verificationStore = useVerificationStore();
  const userStore = useUserInfoStore();

  const isEmailVerified = userStore.user.email_verified;
  const isVerified = userStore.user.verified;
  const isVerificationPending = verificationStore.isVerificationPending;

  const [disabled, setDisabled] = useState(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openVerifyEmailModal, setOpenIVerifyEmailModal] =
    useState(isEmailVerified);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !userStore.user.id) {
      userStore.fetchUser(token);
    }
    if (!isEmailVerified) {
      setOpenIVerifyEmailModal(true);
    } else {
      setOpenIVerifyEmailModal(false);
    }
  }, [userStore]);

  useEffect(() => {
    window.scrollTo(0, 0);
    profileDocuments.fetchDocuments();
    verificationStore.fetchVerificationHistory();
  }, []);

  useEffect(() => {
    const allDocumentsUploaded = profileDocuments.documents.every(
      (document) => document.idFile && document.link
    );

    setDisabled(
      !allDocumentsUploaded ||
        isVerificationPending ||
        !profileDocuments.documents.length
    );
  }, [profileDocuments.documents, isVerificationPending]);

  async function handleUserVerify() {
    setDisabled(true);
    try {
      await verificationStore.submitVerification();
      setOpenVerifyModal(true);
    } catch (error) {
      console.error(error);
      setDisabled(false);
    }
  }

  const closeVerifyEmailModal = () => setOpenIVerifyEmailModal(false);
  const closeVerifyModal = () => setOpenVerifyModal(false);

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
            isDisabled={isVerificationPending || !isEmailVerified}
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

      <Modal isOpen={openVerifyEmailModal}>
        <InfoModal
          title=""
          text="Вы проходите процедуру регистрации на Ubrato. Чтобы начать пользоваться сайтом, пожалуйста, подтвердите адрес электронной почты и пройдите верификацию."
          onClose={closeVerifyEmailModal}
        />
      </Modal>

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
