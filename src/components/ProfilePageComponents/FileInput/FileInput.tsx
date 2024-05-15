import { FC, useState } from 'react';
import styles from './fileinput.module.css';
import { 
  // sendDoc,
   updateToken, uploadFile } from '@/api';
import { FileInfo } from '../FileInfo/FileInfo';

interface FileInputProps {
  header: string;
  id: string;
  type: number;
  link?: string;
}

export const FileInput: FC<FileInputProps> = ({ header, type, id, link }) => {
  const [error, setError] = useState('');
  const [newLink, setNewLink] = useState<string>();

  return (
    <div className={styles.fileContainer}>
      <h3 className={styles.fileHeader}>{header}</h3>
      <p className={styles.fileText}>
        Форматы: pdf, jpg, png, xml, размер одного файла не должен превышать 5 Мб.
      </p>
      <label className={styles.label} htmlFor={id}>
        <div className={styles.fileBtn}>Загрузить</div>
        <input
          onChange={(e) => {
            console.log(e.target.files);
            if (
              ['image/png', 'image/jpeg', 'application/pdf', 'text/xml'].includes(
                e.target.files![0].type
              )
            ) {
              const parameters = { file: e.target.files![0], private: true };
              // console.log(parameters);
              (async () => {
                const link = await updateToken<string, { file: File; private: boolean }>(
                  uploadFile,
                  parameters
                );
                console.log(link);
                setNewLink(link);
                const res = await updateToken<boolean, { link: string; type: number }>(sendDoc, {
                  link: link,
                  type: type,
                });
                console.log(res);
              })();
            } else {
              setError('Неверный тип файла');
              e.target.value = '';
              console.log(e.target.files);
            }
          }}
          className={styles.inputFile}
          type="file"
          name={id}
          id={id}
          accept="image/png, image/jpeg, application/pdf, text/xml"
        />
        {error && <p className={styles.error}>{error}</p>}
      </label>
      {link && !newLink && <FileInfo link={link} />}
      {newLink && !link && <FileInfo link={newLink} />}
    </div>
  );
};
