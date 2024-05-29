import { FC, useRef } from "react";
import styles from '../../CreateTender.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";
import { formatFileSize } from "../../funcs";

const Attachments: FC<{ windowWidth: number }> = ({ windowWidth }) => {
    const createTenderState = useCreateTenderState()

    const inputFileRef = useRef<HTMLInputElement>(null);
    const handleButtonFileClick = () => {
        if (inputFileRef.current) inputFileRef.current.click();
    };

    const inputChangeFileRef = useRef<HTMLInputElement>(null);

    const handleButtonChangeFileClick = () => {
        if (inputChangeFileRef.current) inputChangeFileRef.current.click();
    };

    return (
        <div className={`${styles.section} ${styles.attachments}`}>
            <div className={`${styles.section__block}`}>
                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Вложения:</p>
                <div className={`${styles.section__attachments__block}`}>
                    {!!createTenderState.attachments.length &&
                        <div className={`${styles.section__attachments__block__cardList}`}>
                            {
                                createTenderState.attachments.map((img, ind) => <div key={img.id} className={`${styles.section__attachments__block__cardItem}`}>
                                    {
                                        (img.fileType === 'image' && windowWidth > 1050) ?
                                            <img className={`${styles.section__attachments__block__cardItem__img}`} src={ind < createTenderState.attachments.length ? img.linkToSend : '/create-tender/create-tender-close.svg'} alt="" /> :
                                            <div className={`${styles.section__attachments__block__cardItem__img} ${styles.section__attachments__block__cardItem__notImage}`}>
                                                <img className={styles.section__attachments__block__cardItem__notImageInfo__img} src={img.fileType === 'image' ? '/create-tender/create-tender-img-mobile.svg' : '/create-tender/create-tender-file.svg'} alt="" />
                                                <div className={styles.section__attachments__block__cardItem__notImageInfo}>
                                                    <p>
                                                        <span className={styles.section__attachments__block__cardItem__notImageInfo__span}>{img.fileName}</span>
                                                        , {formatFileSize(img.fileSize)}</p>
                                                    {windowWidth <= 1050 && <img onClick={() => createTenderState.removeAttachment(img.id)} src='/create-tender/create-tender-close-gray.svg' alt="" />}
                                                </div>
                                            </div>
                                    }
                                    {windowWidth > 1050 && <>
                                        <p className={`${styles.section__attachments__block__cardItem__text}`}>{img.fileName} - {img.id}</p>
                                        <div className={`${styles.section__attachments__block__cardItem__changes}`}>
                                            <img className={`${styles.section__attachments__block__cardItem__changes__img}`}
                                                src='/create-tender/create-tender-change-attachment.svg' alt=""
                                                onClick={() => { handleButtonChangeFileClick(); createTenderState.changeAttachmentIdToChange(img.id) }}
                                            />
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*,.pdf,.xml"
                                                onChange={(e) => { createTenderState.handleFileUpload(e, createTenderState.attachmentIdToChange); createTenderState.changeAttachmentIdToChange(null) }}
                                                ref={inputChangeFileRef}
                                                style={{ display: 'none' }}
                                            />
                                            <span className={`${styles.section__attachments__block__cardItem__changes__span}`}></span>
                                            <img onClick={() => createTenderState.removeAttachment(img.id)} className={`${styles.section__attachments__block__cardItem__changes__img}`} src='/create-tender/create-tender-remove-attachment.svg' alt="" />
                                            <p onClick={() => createTenderState.removeAttachment(img.id)} className={`${styles.section__attachments__block__cardItem__changes__text}`}>Удалить</p>
                                        </div>
                                    </>}
                                </div>)
                            }
                        </div>
                    }
                    <button onClick={() => { createTenderState.attachments.length < 8 && handleButtonFileClick() }} disabled={createTenderState.attachments.length >= 8} className={`${styles.section__block__button} ${styles.textRegular} ${styles.section__attachments__block__button} ${createTenderState.errors.includes('attachments') ? styles.section__block__buttonError : ''}`}><img src='/create-tender/create-tender-plus.svg' alt="plus" />Добавить вложения (до 8 шт.)</button>
                    <input
                        type="file"
                        multiple
                        accept="image/*,.pdf,.xml"
                        onChange={(e) => createTenderState.handleFileUpload(e, null)}
                        ref={inputFileRef}
                        style={{ display: 'none' }}
                    />
                    {createTenderState.errors.includes('attachments') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace} ${styles.attachmentsError}`}>Обязательно для заполнения</p>}
                </div>
            </div>
        </div>
    );
}

export default Attachments;