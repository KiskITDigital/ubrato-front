import { FC } from 'react';
import { TenderAttachment } from '../TenderAttachment/TenderAttachment';

interface AdditionalInfoItemProps {
  header: string;
  text: string;
  date: string;
  files: string[];
}

export const AdditionalInfoItem: FC<AdditionalInfoItemProps> = ({ header, text, date, files }) => {
  return (
    <div className="mt-[30px] pb-[30px] border-b border-dashed border-[rgba(0,0,0,.14)]">
      <div className="flex gap-5 mb-[10px] items-center justify-between">
        <h2 className="font-bold text-[24px]">{header}</h2>
        <p className="text-[16px] text-[rgba(0,0,0,.4)]">{date}</p>
      </div>
      <p className="text-[16px] mb-[20px]">{text}</p>
      <div className="flex gap-5 flex-wrap">
        {files.map((file) => (
          <TenderAttachment link={`https://cdn.ubrato.ru/s3${file}`} />
        ))}
      </div>
    </div>
  );
};
