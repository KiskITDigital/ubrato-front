import { documents } from '@/textData/documentsTitles';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const DocumentsPage: FC = () => {
  return (
    <div className='container'>
      <h1>Документы Ubrato</h1>
      <div>
        <nav>
          <Accordion>
            {documents.map((doc, index) => (
              <AccordionItem key={index} title={doc.title}>
                <div className="flex flex-col">
                  {doc.items.map((item, i) => (
                    <Link to={item.link} key={i}>
                      {item.text}
                    </Link>
                  ))}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};
