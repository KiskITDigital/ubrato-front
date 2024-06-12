import { FC } from 'react';
import styles from './info.module.css'

const Info: FC<{
    orgId: string, status: 'orderer' | 'executor',
    isFavorite: boolean,
    favoriteExecutorsHandler: (organization: { id: string, isFavorite: boolean }) => void,
    img: string, brand: string, name: string, inn: string
}> = ({ isFavorite, favoriteExecutorsHandler, orgId, status, img, brand, name, inn }) => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <img className={styles.info__logo} src={img} alt="" />
                <div className={styles.info__text}>
                    <p className={styles.info__text__brand}>{brand}</p>
                    <p className={styles.info__text__name}>{name}</p>
                    <p className={styles.info__text__inn}>ИНН {inn}</p>
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={styles.offerTenderButton}>{status === 'executor' ? 'Предложить тендер' : 'Связаться'}</button>
                <button onClick={() => favoriteExecutorsHandler({ id: orgId, isFavorite })} className={styles.favoriteButton}><img src={isFavorite ? "/find-executor/heart-active.svg" : "/find-executor/heart-black.svg"} alt="+" /> Добав{isFavorite ? 'лено' : 'ить'} в избранное</button>
            </div>
        </div>
    );
}

export default Info;