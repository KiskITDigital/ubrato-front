import { FC, forwardRef, useRef } from "react";
import styles from '../../CreateTender.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";
import { formatFileSize } from "../../funcs";
import { useNavigate } from "react-router-dom";

const Attachments: FC<{ windowWidth: number, ref?: React.LegacyRef<HTMLDivElement>; }> = forwardRef<HTMLDivElement, Omit<{ windowWidth: number, ref?: React.LegacyRef<HTMLDivElement>; }, 'ref'>>((props, ref) => {
    const { windowWidth } = props
    const createTenderState = useCreateTenderState()
    const navigate = useNavigate()

    const inputFileRef = useRef<HTMLInputElement>(null);
    const handleButtonFileClick = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/register');
            return;
        }
        if (inputFileRef.current) inputFileRef.current.click();
    };

    const inputChangeFileRef = useRef<HTMLInputElement>(null);

    const handleButtonChangeFileClick = () => {
        if (inputChangeFileRef.current) inputChangeFileRef.current.click();
    };

    return (
        <div ref={ref} className={`${styles.section} ${styles.attachments}`}>
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
                                                        <span>, {formatFileSize(img.fileSize)}</span></p>
                                                    {windowWidth <= 1050 && <img onClick={() => createTenderState.removeAttachment(img.id)} src='/create-tender/create-tender-close-gray.svg' alt="" />}
                                                </div>
                                            </div>
                                    }
                                    {windowWidth > 1050 && <>
                                        <p className={`${styles.section__attachments__block__cardItem__text}`}>{img.fileName} - {img.id}</p>
                                        <div className={`${styles.section__attachments__block__cardItem__changes}`}>
                                            <img className={`${styles.section__attachments__block__cardItem__changes__img}`}
                                                src='/create-tender/create-tender-change-attachment.svg' alt=""
                                                onClick={() => {
                                                    // e.stopPropagation();
                                                    handleButtonChangeFileClick();
                                                    createTenderState.changeAttachmentIdToChange(img.id)
                                                }}
                                            />
                                            <input
                                                // onClick={(e) => e.stopPropagation()}
                                                type="file"
                                                multiple
                                                accept="image/*,.pdf,.xml"
                                                onChange={(e) => { createTenderState.handleFileUpload(e, createTenderState.attachmentIdToChange); createTenderState.changeAttachmentIdToChange(null) }}
                                                ref={inputChangeFileRef}
                                                style={{ display: 'none' }}
                                            />
                                            <span className={`${styles.section__attachments__block__cardItem__changes__span}`}></span>
                                            <img onClick={() => {
                                                // e.stopPropagation(); 
                                                createTenderState.removeAttachment(img.id)
                                            }} className={`${styles.section__attachments__block__cardItem__changes__img}`} src='/create-tender/create-tender-remove-attachment.svg' alt="" />
                                            <p onClick={() => {
                                                // e.stopPropagation(); 
                                                createTenderState.removeAttachment(img.id)
                                            }} className={`${styles.section__attachments__block__cardItem__changes__text}`}>Удалить</p>
                                        </div>
                                    </>}
                                </div>)
                            }
                        </div>
                    }
                    <button onClick={() => {
                        // e.stopPropagation();
                        createTenderState.attachments.length < 8 && handleButtonFileClick()
                    }} disabled={createTenderState.attachments.length >= 8} className={`${styles.section__block__button} ${styles.textRegular} ${styles.section__attachments__block__button} ${createTenderState.errors.includes('attachments') ? styles.section__block__buttonError : ''}`}><img src='/create-tender/create-tender-plus.svg' alt="plus" />Добавить вложения (до 8 шт.)</button>
                    <input
                        // onClick={(e) => e.stopPropagation()}
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
})

export default Attachments;