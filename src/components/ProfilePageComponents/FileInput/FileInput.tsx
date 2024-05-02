import { FC } from 'react';
import styles from './fileinput.module.css';

interface FileInputProps {
  header: string;
  addFile: (filesArr: File[], file: File) => void;
  files: File[];
  id: string;
}

export const FileInput: FC<FileInputProps> = ({ header, addFile, files, id }) => {
  return (
    <div className={styles.fileContainer}>
      <h3 className={styles.fileHeader}>{header}</h3>
      <p className={styles.fileText}>
        Форматы: pdf, jpg, png, xml, размер одного файла не должен превышать 5 Мб.
      </p>
      <label htmlFor={id}>
        <div className={styles.fileBtn}>Загрузить</div>
        <input
          onChange={(e) => {
            console.log(e.target.files);
            addFile(files, e.target.files![0]);
          }}
          className={styles.inputFile}
          type="file"
          name={id}
          id={id}
          accept="image/png, image/jpeg, application/pdf, text/xml"
        />
      </label>
    </div>
  );
};
