import { FC } from 'react';
import styles from './offer-tender.module.css'

const OfferTender: FC<{
    closeModal: (newState: null) => void
    executorId: string
}> = ({ closeModal, executorId }) => {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <h1 onClick={() => {
                    document.body.style.overflow = "scroll";
                    closeModal(null)
                }}>modla\</h1>
                <p>{executorId}</p>
            </div>
        </div>
    );
}

export default OfferTender;