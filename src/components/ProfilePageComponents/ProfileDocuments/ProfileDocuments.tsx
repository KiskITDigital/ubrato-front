import { FC, useEffect, useState } from 'react';
import styles from './profiledocuments.module.css';
import { FileInput } from '../FileInput/FileInput';
import { fetchDocumentsTypes, fetchUserDocs, updateToken } from '@/api';

interface documentInfo {
  type: number;
  header: string;
  id: string;
  link?: string;
}

export const ProfileDocuments: FC = () => {
  const [documentsList, setDocumentsList] = useState<documentInfo[]>([]);

  useEffect(() => {
    const documentsTypes: Record<number, string> = {
      1: 'egrul',
      2: 'company_card',
      3: 'director_order',
      4: 'company_regulation',
    };
    (async () => {
      const res = await fetchDocumentsTypes();
      const userDocs = await updateToken<{ id: string; link: string; type: string }[], null>(
        fetchUserDocs,
        null
      );
      console.log(userDocs);
      const docsArr: documentInfo[] = res.map((e) => {
        return {
          type: e.id,
          header: e.name,
          id: documentsTypes[e.id],
          link: userDocs.find((i) => i.type === e.name)?.link,
        };
      });
      setDocumentsList(docsArr);
    })();
  }, []);

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
      {documentsList.map((e) => (
        <FileInput key={e.type} id={e.id} header={e.header} type={e.type} link={e.link} />
      ))}
    </div>
  );
};
