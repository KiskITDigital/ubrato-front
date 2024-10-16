import { FC } from 'react';
import style from './OneTenderAttachments.module.css';
// import { downloadFile } from '@/api/updateAvatar';
import { TenderAttachment } from '../TenderAttachment/TenderAttachment';

type TenderAttachments = {
  attachment: Array<string>;
};

export const OneTenderAttachments: FC<TenderAttachments> = ({ attachment }) => {
  // const downloadClickHandler = async (file: string) => {
  //   if (token) {
  //     await downloadFile(token, file);
  //   } else {
  //     console.error('Token is missing');
  //   }
  // };

  return (
    <div className={style.block_main}>
      <p className={style.block_main_p}>Вложения:</p>
      <div className="flex gap-[20px]">
        {attachment?.map((obj, index) => (
          <TenderAttachment link={obj} key={index} />
        ))}
      </div>
    </div>
  );
};
