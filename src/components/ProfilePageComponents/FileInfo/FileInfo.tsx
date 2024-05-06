import { fetchPrivateFileInfo, updateToken } from '@/api';
import { FC, useEffect, useState } from 'react';

export const FileInfo: FC<{ link: string }> = ({ link }) => {
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
      console.log(res);
      setFileDate(new Date(res.ctime));
      setFileInfo(res);
    })();
  }, [link]);

  return (
    <div>
      <p>{fileInfo?.format.slice(1)}</p>
      <p>{fileInfo ? (fileInfo?.size / 1024).toFixed(1) : ''}kb</p>
      <p>Загружен {fileDate?.toLocaleString('default', { day: 'numeric', month: 'long' })}</p>
    </div>
  );
};
