import { documents } from '@/textData/documentsTitles';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const DocumentsPage: FC = () => {
  const itemClasses = {
    base: 'w-[270px]',
    title: 'font-bold text-[16px]',
    heading: 'bg-[#EBF5FF] w-[270px] rounded-[13px]',
    indicator: 'rotate-[-90deg] group-data-[open=true]:rotate-90 transition-transform',
    trigger: 'p-[14px] group justify-between',
    content: 'w-[256px] p-0 mt-3',
    titleWrapper: '',
  };

  const location = useLocation();

  return (
    <div className="container mt-5">
      <div className="flex gap-5">
        <nav className="px-5 py-6 rounded-[30px] bg-white shadow-md w-[310px]">
          <Accordion
            defaultExpandedKeys={['0', '1']}
            itemClasses={itemClasses}
            className="p-0 gap-6"
            selectionMode="multiple"
            variant="splitted"
          >
            {documents.map((doc, index) => (
              <AccordionItem key={index} title={doc.title}>
                <div className="flex flex-col">
                  {doc.items.map((item, i) => (
                    <Link
                      to={item.link}
                      className={`pl-[14px] border-l-2 mb-2 text-[12px] ${
                        location.pathname.split('/')[2] === item.link
                          ? 'font-bold border-solid border-black'
                          : 'border-transparent'
                      }`}
                      key={i}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </nav>
        <div className="flex flex-col items-center w-full">
          <h1 className="text-4xl text-center font-bold">
            Документы <span className="text-accent">Ubrato</span>
          </h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
