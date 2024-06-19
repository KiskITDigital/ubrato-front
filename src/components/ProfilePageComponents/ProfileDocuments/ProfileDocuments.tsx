import { FC, useEffect, useState } from 'react';
import styles from './profiledocuments.module.css';
import { FileInput } from '../FileInput/FileInput';
import { useProfileDocumentsStore } from '@/store/profileDocumentsStore';
import { Checkbox } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export const ProfileDocuments: FC = () => {
  const profileDocuments = useProfileDocumentsStore();
  const fetchDocuments = profileDocuments.fetchDocuments;
  // const [documents, setDocuments] = useState([]);

  const [disabled, setDisabled] = useState(true);
  const [checkBoxes, setCheckBoxes] = useState({
    1: false,
    2: false,
    3: false,
  });

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
    if (
      profileDocuments.documents.length === 4 &&
      checkBoxes[1] &&
      checkBoxes[2] &&
      checkBoxes[3]
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    console.log(profileDocuments.documents);
    
  }, [checkBoxes, profileDocuments.documents.length]);

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
        <Checkbox
          isSelected={checkBoxes[1]}
          onValueChange={() => {
            setCheckBoxes({ 1: !checkBoxes[1], 2: checkBoxes[2], 3: checkBoxes[3] });
          }}
          classNames={checkStyle}
        >
          Согласие с Пользовательским соглашением ООО «Интеграция»
        </Checkbox>
        <Checkbox
          isSelected={checkBoxes[2]}
          onValueChange={() => {
            setCheckBoxes({ 1: checkBoxes[1], 2: !checkBoxes[2], 3: checkBoxes[3] });
          }}
          classNames={checkStyle}
        >
          Согласие с “Политикой обработки персональных данных” ООО «Интеграция»
        </Checkbox>
        <Checkbox
          isSelected={checkBoxes[3]}
          onValueChange={() => {
            setCheckBoxes({ 1: checkBoxes[1], 2: checkBoxes[2], 3: !checkBoxes[3] });
          }}
          classNames={checkStyle}
        >
          Согласие на обработку персональных данных
        </Checkbox>
        <button disabled={disabled} className={styles.send}>
          Отправить на верификацию
        </button>
        <p className={styles.help}>Есть вопросы по верификации?</p>
        <p className={styles.help}>
          <Link to="../help" className={styles.link}>
            Напишите
          </Link>{' '}
          телефон и мы перезвоним.
        </p>
      </div>
    </div>
  );
};
