import { FC, useEffect, useRef, useState } from 'react';
import styles from './CreateTender.module.css';
import Title from './CreateTenderComponents/Title/Title';
import CleaningTZ from './CreateTenderComponents/CleaningTZ/CleaningTZ';
import NameTender from './CreateTenderComponents/NameTender/NameTender';
import City from './CreateTenderComponents/City/City';
import Object from './CreateTenderComponents/Object/Object';
import Services from './CreateTenderComponents/Services/Services';
import Description from './CreateTenderComponents/Description/Description';
import Wishes from './CreateTenderComponents/Wishes/Wishes';
import Attachments from './CreateTenderComponents/Attachments/Attachments';
import SendButtons from './CreateTenderComponents/SendButtons/SendButtons';
import Dates from './CreateTenderComponents/Dates/Dates';
import { useCreateTenderState } from '@/store/createTenderStore';
import { useLocation } from 'react-router-dom';
import { fetchDraft, updateToken } from '@/api';

export const CreateTender: FC = () => {
  const startRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLHeadingElement>(null);

  const createTenderState = useCreateTenderState();

  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState<number>(1920);

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 200, behavior: 'smooth' });
    }, 0);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (location.search) {
      (async () => {
        const data = await updateToken(fetchDraft, location.search.split('id=')[1]);
        console.log(data);
      })();
    }
  }, [location.search]);

  useEffect(() => {
    if (createTenderState.isValidating === true && errorRef.current) {
      errorRef.current!.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const elementTop = errorRef.current!.getBoundingClientRect().top;
        window.scrollBy({ top: elementTop - 120, behavior: 'smooth' });
      }, 0);
      createTenderState.changeIsValidating(false);
    }
  }, [createTenderState]);

  return (
    <div className={`container ${styles.container}`}>
      <span ref={startRef}></span>
      <Title />
      <NameTender ref={createTenderState.errors[0] === 'name' ? errorRef : undefined} />
      <div className={`${styles.switcher}`}>
        <div className={`${styles.switcher__div} ${styles.borderBottomBlue}`}>
          <p>Тендер</p>
        </div>
        {windowWidth > 1050 && (
          <div className={`${styles.switcher__div} ${styles.switcher__lastdiv}`}>
            <img src="/create-tender/create-tender-refresh.svg" alt="refresh" />
            <p className={`${styles.switcher__p} ${styles.textBlack40}`}>
              Автосохранение черновика
            </p>
          </div>
        )}
      </div>
      {windowWidth <= 1050 && (
        <div
          className={`${styles.switcher__div} ${styles.switcher__lastdiv} ${styles.switcher__lastdivMobile}`}
        >
          <img src="/create-tender/create-tender-refresh.svg" alt="refresh" />
          <p className={`${styles.switcher__p} ${styles.textBlack40}`}>Автосохранение черновика</p>
        </div>
      )}
      <>
        <Dates ref2={createTenderState.errors[0] === 'price' ? errorRef : undefined} />
        <CleaningTZ ref={createTenderState.errors[0] === 'tz' ? errorRef : undefined} />
        <City ref={createTenderState.errors[0] === 'city' ? errorRef : undefined} />
        <Object
          ref={
            createTenderState.errors[0] === 'floor_space' ||
            createTenderState.errors[0] === 'object'
              ? errorRef
              : undefined
          }
          windowWidth={windowWidth}
        />
        <Services
          ref={createTenderState.errors[0] === 'services' ? errorRef : undefined}
          windowWidth={windowWidth}
        />
        <Description ref={createTenderState.errors[0] === 'description' ? errorRef : undefined} />
        <Wishes ref={createTenderState.errors[0] === 'wishes' ? errorRef : undefined} />
        <Attachments
          ref={createTenderState.errors[0] === 'attachments' ? errorRef : undefined}
          windowWidth={windowWidth}
        />
        <SendButtons />
      </>
    </div>
  );
};
