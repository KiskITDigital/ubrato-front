import { FC, useEffect, useState } from 'react';
import styles from './profiledocuments.module.css';
import { FileInput } from '../FileInput/FileInput';

export const ProfileDocuments: FC = () => {
  const [files, setFiles] = useState<string[]>([]);

  const addFile = (filesArr: string[], file: string) => {
    const files = [...filesArr];
    files.push(file);
    setFiles(files);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

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
      <FileInput id="egrul" files={files} addFile={addFile} header="ЕГРЮЛ" />
      <FileInput id="company_card" files={files} addFile={addFile} header="Карточка компании" />
      <FileInput
        id="director_order"
        files={files}
        addFile={addFile}
        header="Приказ о назначении гендиректора"
      />
      <FileInput id="company_regulation" files={files} addFile={addFile} header="Устав компании" />
    </div>
  );
};
