import { FC, useState } from 'react';
import styles from './fileinput.module.css';
import { updateToken, uploadFile } from '@/api';

interface FileInputProps {
  header: string;
  addFile: (filesArr: string[], file: string) => void;
  files: string[];
  id: string;
}

export const FileInput: FC<FileInputProps> = ({ header, addFile, files, id }) => {
  const [error, setError] = useState('');

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
                addFile(files, link);
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
    </div>
  );
};
