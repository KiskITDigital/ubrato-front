import { FC } from "react";
import styles from '../../CreateTender.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";

const Wishes: FC = () => {
    const createTenderState = useCreateTenderState()

    return (
        <div className={`${styles.section} ${styles.wishes}`}>
            <div className={`${styles.section__block}`}>
                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Пожелания:</p>
                <textarea
                    onFocus={() => createTenderState.removeError('wishes')}
                    onBlur={() => !createTenderState.wishes && createTenderState.addError('wishes')}
                    value={createTenderState.wishes}
                    onChange={(e) => createTenderState.handleSimpleInput('wishes', e.currentTarget.value)}
                    name="" id="" rows={5}
                    className={`${styles.input} ${styles.wishes__textarea} ${createTenderState.errors.includes('wishes') ? styles.inputError : ''}`}
                ></textarea>
                {createTenderState.errors.includes('wishes') && <p className={`${styles.inputErrorText} ${styles.textAreaError}`}>Обязательно для заполнения</p>}
            </div>
        </div>
    );
}

export default Wishes;