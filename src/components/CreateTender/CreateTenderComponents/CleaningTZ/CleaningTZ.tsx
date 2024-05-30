import { FC, useRef } from "react";
import styles from '../../CreateTender.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";
import { formatFileSize } from "../../funcs";
// import { useNavigate } from "react-router-dom";

const CleaningTZ: FC = () => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const createTenderState = useCreateTenderState()
    // const navigate = useNavigate()
    const handleButtonFileClick = () => {
        if (inputFileRef.current) inputFileRef.current.click();
    };
    return (
        <div className={`${styles.section} ${styles.cleaningTZ}`}>
            <div className={`${styles.section__block}`}>
                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>ТЗ на уборку:</p>
                {
                    createTenderState.cleaningTZ &&
                    <p className={`${styles.textMedium} ${styles.cleaningTZText}`}>{createTenderState.cleaningTZ.fileName}<span className={styles.textGray}>, {formatFileSize(createTenderState.cleaningTZ.fileSize)}</span></p>
                }
                <button onClick={() => {
                    // const token = localStorage.getItem('token')
                    // if (!token) {
                    //     navigate('/register');
                    //     return;
                    // }
                    createTenderState.cleaningTZ ?
                        createTenderState.removeCleaningTZ() :
                        handleButtonFileClick()
                }} className={`${styles.section__block__button} ${styles.textRegular}`}>
                    {
                        createTenderState.cleaningTZ ?
                            <img className={styles.removeTZ} src='/create-tender/create-tender-remove-attachment.svg' alt="" />
                            :
                            <>
                                <img src="/create-tender/create-tender-plus.svg" alt="plus" />Загрузить
                            </>
                    }
                </button>
                <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={(e) => createTenderState.handleFileUpload(e, null, 'upload-tz')}
                    ref={inputFileRef}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
}

export default CleaningTZ;