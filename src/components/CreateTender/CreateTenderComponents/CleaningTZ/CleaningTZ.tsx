import { FC } from "react";
import styles from '../../CreateTender.module.css'

const CleaningTZ: FC = () => {
    return (
        <div className={`${styles.section} ${styles.cleaningTZ}`}>
            <div className={`${styles.section__block}`}>
                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>ТЗ на уборку:</p>
                <button className={`${styles.section__block__button} ${styles.textRegular}`}><img src="/create-tender/create-tender-plus.svg" alt="plus" />Заполнить</button>
            </div>
        </div>
    );
}

export default CleaningTZ;