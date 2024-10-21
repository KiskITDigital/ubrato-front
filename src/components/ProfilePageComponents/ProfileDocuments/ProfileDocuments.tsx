import { FC, useEffect, useState } from 'react';
import styles from './profiledocuments.module.css';
import { FileInput } from '../FileInput/FileInput';
import { useProfileDocumentsStore } from '@/store/profileDocumentsStore';
import { Checkbox } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { verifyUser } from '@/api/verification';
import Modal from '@/components/Modal';
import ContactModal from '@/components/Modal/ContactModal';

export const ProfileDocuments: FC = () => {
  const profileDocuments = useProfileDocumentsStore();
  const fetchDocuments = profileDocuments.fetchDocuments;

  const [disabled, setDisabled] = useState(true);

  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDocuments();
  }, [fetchDocuments]);

  useEffect(() => {
    if (profileDocuments.documents.every((document) => document.idFile && document.link)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [profileDocuments.documents]);

  function handleUserVerify() {
    setDisabled(true);
    verifyUser(localStorage.getItem('token') || '').catch((error) => {
      console.log(error);
      setDisabled(false);
    });
  }

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>Документы для верификации</h2>
        <p>Чтобы начать работу с тендерами пройдите верификацию.</p>
        <p>
          Загрузите выписку из ЕГРЮЛ, приказ о назначении генерального директора, карточку и устав
          компании.
        </p>
      </div>
      {profileDocuments.documents.map((e) => (
        <FileInput
          key={e.id}
          id={e.id}
          header={e.header}
          type={e.type}
          link={e.link}
          idFile={e.idFile}
        />
      ))}
      <div className={styles.checkContainer}>
        <button disabled={disabled} className={styles.send} onClick={handleUserVerify}>
          Отправить на верификацию
        </button>
        <p className={styles.help}>Есть вопросы по верификации?</p>
        <p className={styles.help}>
          <span className={styles.link} onClick={() => setOpenModal(true)}>
            Напишите
          </span>{' '}
          телефон и мы перезвоним.
        </p>
      </div>
      <Modal isOpen={openModal}>
        <ContactModal onClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};
