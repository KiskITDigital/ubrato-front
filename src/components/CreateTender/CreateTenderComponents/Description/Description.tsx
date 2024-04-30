import { FC } from "react";
import styles from '../../CreateTender.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";

const Description: FC = () => {
    const createTenderState = useCreateTenderState()

    return (
        <div className={`${styles.section} ${styles.description}`}>
            <div className={`${styles.section__block}`}>
                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Описание тендера:</p>
                <textarea
                    onFocus={() => createTenderState.removeError('description')}
                    onBlur={() => !createTenderState.description && createTenderState.addError('description')}
                    value={createTenderState.description}
                    onChange={(e) => createTenderState.handleSimpleInput('description', e.currentTarget.value)}
                    name="" id="" rows={5}
                    className={`${styles.input} ${styles.description__textarea} ${createTenderState.errors.includes('description') ? styles.inputError : ''}`}
                ></textarea>
                {createTenderState.errors.includes('description') && <p className={`${styles.inputErrorText} ${styles.textAreaError}`}>Обязательно для заполнения</p>}
            </div>
        </div>
    );
}

export default Description;