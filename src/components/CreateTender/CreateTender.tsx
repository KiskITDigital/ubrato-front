import { FC, useEffect, useState } from "react";
import styles from './CreateTender.module.css'
import Title from "./CreateTenderComponents/Title/Title";
import CleaningTZ from "./CreateTenderComponents/CleaningTZ/CleaningTZ";
import NameTender from "./CreateTenderComponents/NameTender/NameTender";
import City from "./CreateTenderComponents/City/City";
import Object from "./CreateTenderComponents/Object/Object";
import Services from "./CreateTenderComponents/Services/Services";
import Description from "./CreateTenderComponents/Description/Description";
import Wishes from "./CreateTenderComponents/Wishes/Wishes";
import Attachments from "./CreateTenderComponents/Attachments/Attachments";
import SendButtons from "./CreateTenderComponents/SendButtons/SendButtons";
import Dates from "./CreateTenderComponents/Dates/Dates";

export const CreateTender: FC = () => {
    const status = 'создание тендера'
    const [switcher, setSwitcher] = useState('Тендер');

    const [windowWidth, setWindowWidth] = useState<number>(1920);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () => { setWindowWidth(window.innerWidth); });
    }, []);

    return (
        <div className={`container ${styles.container}`}>
            <Title />
            <NameTender />
            <div className={`${styles.switcher}`}>
                <div onClick={() => setSwitcher('Тендер')} className={`${styles.switcher__div} ${switcher === 'Тендер' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Тендер' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Тендер</p></div>
                {status !== 'создание тендера' && (<>
                    <div className={`${styles.switcher__div}`}><span className={`${styles.switcher__span}`}></span></div>
                    <div onClick={() => setSwitcher('Отклики')} className={`${styles.switcher__div} ${switcher === 'Отклики' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Отклики' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Отклики</p><p className={`${styles.switcher__p2}`}>{2}</p></div>
                    <div className={`${styles.switcher__div}`}><span className={`${styles.switcher__span}`}></span></div>
                    <div onClick={() => setSwitcher('Чат')} className={`${styles.switcher__div} ${switcher === 'Чат' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Чат' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Чат</p><p className={`${styles.switcher__p2}`}>{34}</p></div>
                    <div className={`${styles.switcher__div}`}><span className={`${styles.switcher__span}`}></span></div>
                    <div onClick={() => setSwitcher('Доп. информация')} className={`${styles.switcher__div} ${switcher === 'Доп. информация' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Доп. информация' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Доп. информация</p></div>
                </>)}
                {
                    windowWidth > 1050 &&
                    <div className={`${styles.switcher__div} ${styles.switcher__lastdiv}`}>
                        <img src="/create-tender/create-tender-refresh.svg" alt="refresh" />
                        <p className={`${styles.switcher__p} ${styles.textBlack40}`}>Автосохранение черновика</p>
                    </div>
                }
            </div>
            {
                windowWidth <= 1050 &&
                <div className={`${styles.switcher__div} ${styles.switcher__lastdiv} ${styles.switcher__lastdivMobile}`}>
                    <img src="/create-tender/create-tender-refresh.svg" alt="refresh" />
                    <p className={`${styles.switcher__p} ${styles.textBlack40}`}>Автосохранение черновика</p>
                </div>
            }
            {switcher === 'Тендер' &&
                (
                    <>
                        <Dates />
                        <CleaningTZ />
                        <City />
                        <Object windowWidth={windowWidth} />
                        <Services windowWidth={windowWidth} />
                        <Description />
                        <Wishes />
                        <Attachments windowWidth={windowWidth} />
                        <SendButtons />
                    </>
                )
            }
        </div >
    )
}