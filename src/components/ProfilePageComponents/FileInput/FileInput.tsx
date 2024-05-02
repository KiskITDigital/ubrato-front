import { FC } from 'react';
import styles from './fileinput.module.css';

interface FileInputProps {
  header: string;
  addFile: (filesArr: File[], file: File) => void;
  files: File[];
}

export const FileInput: FC<FileInputProps> = ({ header, addFile, files }) => {
  return (
    <div className={styles.fileContainer}>
      <h3 className={styles.fileHeader}>{header}</h3>
      <p className={styles.fileText}>
        Форматы: pdf, jpg, png, xml, размер одного файла не должен превышать 5 Мб.
      </p>
      <label htmlFor="egrul">
        <div className={styles.fileBtn}>Загрузить</div>
        <input
          onChange={(e) => {
            console.log(e.target.files);
            addFile(files, e.target.files![0]);
          }}
          className={styles.inputFile}
          type="file"
          name="egrul"
          id="egrul"
          accept="image/png, image/jpeg, application/pdf, text/xml"
        />
      </label>
    </div>
  );
};
