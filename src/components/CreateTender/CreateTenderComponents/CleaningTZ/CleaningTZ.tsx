/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, forwardRef, useRef } from "react";
import styles from '../../CreateTender.module.css'
import cleaningTZStyles from './cleaning-tz.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";
import { formatFileSize } from "../../funcs";

const CleaningTZ: FC<{ ref?: React.LegacyRef<HTMLDivElement>; }> = forwardRef<HTMLDivElement, { ref?: React.LegacyRef<HTMLDivElement>; }>((_, ref) => {

    const inputFileRef = useRef<HTMLInputElement>(null);
    const createTenderState = useCreateTenderState()
    const handleButtonFileClick = () => {
        if (inputFileRef.current) inputFileRef.current.click();
    };
    return (
        <div ref={ref} className={`${styles.section} ${styles.cleaningTZ}`}>
            <div className={`${styles.section__block}`}>
                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>ТЗ на уборку:</p>
                {
                    createTenderState.cleaningTZ &&
                    <p className={`${styles.textMedium} ${styles.cleaningTZText}`}>{createTenderState.cleaningTZ.fileName}<span className={styles.textGray}>, {formatFileSize(createTenderState.cleaningTZ.fileSize)}</span></p>
                }
                <button onClick={() => {
                    createTenderState.cleaningTZ ?
                        createTenderState.removeCleaningTZ() :
                        handleButtonFileClick()
                    createTenderState.removeError('tz')
                }} className={`${styles.section__block__button} ${styles.textRegular} ${createTenderState.errors.includes('tz') ? cleaningTZStyles.cleaningTZError : ''}`}>
                    {
                        createTenderState.cleaningTZ ?
                            <img className={styles.removeTZ} src='/create-tender/create-tender-remove-attachment.svg' alt="" />
                            :
                            <>
                                <img src="/create-tender/create-tender-plus.svg" alt="plus" />Загрузить
                            </>
                    }
                </button>
                {createTenderState.errors.includes('tz') && <p className={`${styles.inputErrorText} ${cleaningTZStyles.cleaningTZErrorText}`}>Обязательно для заполнения</p>}
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
})

export default CleaningTZ;