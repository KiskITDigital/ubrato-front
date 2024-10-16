import { fetchFileInfo } from '@/api';
import { formatFileSize } from '@/components/CreateTender/funcs';
import { FC, useEffect, useState } from 'react';

export const TenderAttachment: FC<{ link: string }> = ({ link }) => {
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    format: string;
    size: number;
    ctime: string;
  }>();

  const isImage = (format: string | undefined): boolean => {
    if (!format) return false;
    return ['.jpg', '.jpeg', '.png'].includes(format);
  };

  useEffect(() => {
    (async () => {
      const fileInfo = await fetchFileInfo(link.split('s3')[1]);
      setFileInfo(fileInfo);
    })();
  }, [link]);

  return (
    <div>
      {isImage(fileInfo?.format) && (
        <div className="flex flex-col items-center">
          <img
            className="h-[135px] w-auto rounded-[15px] mb-[10px] shadow-md"
            src={link}
            alt="img"
          />
          <p>{fileInfo?.name.split('.')[1]}</p>
        </div>
      )}
      {!isImage(fileInfo?.format) && (
        <div className="flex flex-col items-center">
          <div className="flex flex-col justify-between px-[20px] py-[15px] mb-[10px] w-[235px] h-[135px] rounded-[15px] border-solid border-[1px] border-[rgba(0,0,0,.1)] shadow-md">
            <img
              className="w-[34px] h-[34px]"
              src="/create-tender/create-tender-file.svg"
              alt="file"
            />
            <div className="flex justify-between">
              <p className="text-[#666]">
                {fileInfo?.format.replace('.', '').toUpperCase()},{' '}
                {fileInfo && formatFileSize(fileInfo.size)}
              </p>
              <a target="_blank" href={link}>
                <img className="w-[24px] h-[24px]" src="/download-ic.svg" alt="download" />
              </a>
            </div>
          </div>
          <p>{fileInfo?.name.split('.')[1]}</p>
        </div>
      )}
    </div>
  );
};
