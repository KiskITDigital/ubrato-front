import { FC } from "react";
import styles from './after-send-info.module.css'
import { Link } from "react-router-dom";

const AfterSendInfo: FC<{ executorName: string | null, closeModal: () => void }> = ({ executorName, closeModal }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <p className={styles.title__text}>
                    {
                        executorName ? <>

                            После модерации тендер будет отправлен исполнителю <span className={styles.link}>{executorName}</span>
                        </> :
                            "Ваш тендер отправлен на модерацию"
                    }
                </p>
                <button className={styles.title__closeIcon}>
                    <img onClick={closeModal} src="/x-icon.svg" alt="" />
                </button>
            </div>
            <div className={styles.info}>
                <img className={styles.info__img} src="/info-blue-ic.svg" alt="i" />
                <p className={styles.info__text}>
                    {
                        executorName ?
                            <>
                                Сейчас ваш тендер находится на модерации и сохранен в разделе мои тендеры, после ее прохождения тендер будет отправлен выбранному исполнителю и отправить ему тендер. Также вы можете создать еще один тендер.
                            </> :
                            <>
                                Сейчас ваш тендер находится на модерации и сохранен в разделе мои тендеры, после ее прохождения вы можете <Link className={styles.link} to="/find-executor">найти исполнителя</Link> и отправить ему тендер. Также вы можете создать еще один тендер.
                            </>
                    }

                </p>
            </div>
            <div className={styles.buttons}>
                <Link onClick={closeModal} to="/profile/tenders"><button className={styles.buttons__myTendersButton}>Мои тендеры</button></Link>
                <button onClick={closeModal} className={styles.buttons__createTenderButton}>Создать</button>
            </div>
        </div>
    );
}

export default AfterSendInfo;