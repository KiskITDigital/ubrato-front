import { documentsContant } from '@/textData/documentsContent';
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const DocumentItem: FC = () => {
  const location = useLocation();

  const document = documentsContant[location.pathname.split('/')[2]];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const modalStyle = {
    wrapper:
      'z-[7] absolute top-[calc(50vh-143px)] left-[calc(50vw-270px)] w-[540px] h-[286px] bg-white p-5 shadow-md rounded-[20px]',
    backdrop: 'z-[6] backdrop-blur absolute top-0 left-0 w-full h-full',
    closeButton:
      'absolute right-0 w-[34px] h-[34px] bg-[rgba(0,0,0,.04)] rounded-[10px] flex items-center justify-center',
  };

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
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              backdrop="blur"
              classNames={modalStyle}
            >
              <ModalContent>
                <div className="mt-[70px] flex flex-col justify-between h-full">
                  <p className="text-lg font-semibold">
                    Скачать документ{' '}
                    <span className="text-accent underline">
                      Согласие на размещение и обнародование фотографий и иных материалов для
                      Исполнителей
                    </span>{' '}
                    в формате pdf
                  </p>
                  <Link
                    className="self-center text-lg font-bold w-[200px] h-[48px] flex items-center justify-center bg-accent text-white rounded-[17px]"
                    target="_blank"
                    download
                    to={document.link}
                  >
                    Скачать
                  </Link>
                </div>
              </ModalContent>
            </Modal>
            <button onClick={onOpen} className="absolute top-[14px] right-5">
              <img className="w-[32px] h-[32px]" src="/download-ic-blue.svg" alt="download" />
            </button>
          </header>
          <div className="mt-[25px] px-5">
            <article className="prose prose-a:text-accent">{document.textContent}</article>
          </div>
        </>
      )}
      {!document && <p className="text-2xl mt-[30px]">Документ не найден</p>}
    </div>
  );
};
