import { documentsContant } from '@/textData/documentsContent';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const DocumentItem: FC = () => {
  const location = useLocation();

  const document = documentsContant[location.pathname.split('/')[2]];

  console.log(document);

  return (
    <div>
      {document && (
        <>
          <header className="mt-[30px] relative px-5 py-[14px] bg-[#EBF5FF] rounded-[13px]">
            <h2 className="font-bold text-[20px]">{document.title}</h2>
            <p className="text-[rgba(0,0,0,.5)] mt-3">
              Дата публикации: {document.publicationDate}
            </p>
            <p className="text-[rgba(0,0,0,.5)]">
              Дата вступления в силу: {document.entryIntoForceDAte}
            </p>
            <Link className="absolute top-[14px] right-5" target="_blank" to={document.link}>
              <img className="w-[32px] h-[32px]" src="/download-ic-blue.svg" alt="download" />
            </Link>
          </header>
          <div className="mt-[25px] px-5">
            {document.textContent.map((item, index) => (
              <p className='text-lg' key={index}>{item}</p>
            ))}
          </div>
        </>
      )}
      {!document && <p className='text-2xl mt-[30px]'>Документ не найден</p>}
    </div>
  );
};
