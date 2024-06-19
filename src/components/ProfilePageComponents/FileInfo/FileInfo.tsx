import { fetchPrivateFileInfo, handleFileDelete, updateToken } from '@/api';
import { useProfileDocumentsStore } from '@/store/profileDocumentsStore';
import { FC, useEffect, useState } from 'react';
import styles from './fileinfo.module.css';

export const FileInfo: FC<{ link: string; id: string }> = ({ link, id }) => {
  const fetchDocuments = useProfileDocumentsStore();
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    format: string;
    size: number;
    ctime: string;
  }>();
  const [fileDate, setFileDate] = useState<Date>();

  useEffect(() => {
    (async () => {
      const res = await updateToken(fetchPrivateFileInfo, link);
      setFileDate(new Date(res.ctime));
      setFileInfo(res);
    })();
  }, [link]);

  return (
    <div className={styles.container}>
      <div className={styles.flexText}>
        <p className={styles.text}>{fileInfo?.format.slice(1)}</p>
        <p className={styles.text}>{fileInfo ? (fileInfo?.size / 1024).toFixed(1) : ''}kb</p>
      </div>
      <p className={styles.text}>
        Загружен {fileDate?.toLocaleString('default', { day: 'numeric', month: 'long' })}{' '}
        {fileDate?.getFullYear()}
      </p>
      <button
        className={styles.btn}
        onClick={() => {
          (async () => {
            // console.log(id);
            await updateToken(handleFileDelete, id);
            await fetchDocuments.fetchDocuments();
            fetchDocuments.removeDocument(id)
          })();
        }}
      >
        <img src="/trash-bin.svg" alt="" />
        Удалить
      </button>
    </div>
  );
};
