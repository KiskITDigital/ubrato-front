/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, forwardRef } from "react";
import styles from '../../CreateTender.module.css'
import datesStyles from './Dates.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";
import { Checkbox, Switch } from "@nextui-org/react";
import {
    addTwoDots,
    checkOnlyNumber
} from "../../funcs";
import DateRangePickerLocal from "../DateRangePickerLocal/DateRangePickerLocal";

const Dates: FC<{ ref?: React.LegacyRef<HTMLDivElement>; }> = forwardRef<HTMLDivElement, { ref?: React.LegacyRef<HTMLDivElement>; }>((_, ref) => {
    const createTenderState = useCreateTenderState()

    return (
        <div ref={ref} className={`${styles.firstSections}`}>
            <div className={`${styles.firstSections__div} ${styles.firstSections__responses}`}>
                <div className={`${styles.firstSections__div__title}`}>
                    <p className={`${styles.firstSections__div__title__p}`}>Прием откликов</p>
                </div>
                <div className={`${styles.firstSections__div__main} ${styles.firstSections__div__mainWork} ${datesStyles.dateTimeContainer}`}>
                    <p className={`${styles.firstSections__div__main__block__p}`}>Начало</p>
                    <p className={`${styles.firstSections__div__main__block__p}`}>Окончание</p>
                    <DateRangePickerLocal timeToChangeStart="reception_start" timeToChangeEnd="reception_end" />
                    <div className={datesStyles.dateTime}>
                        <span className={styles.firstSections__responses__inputs__span}></span>
                        <input
                            placeholder="00:00"
                            maxLength={5}
                            value={createTenderState.reception_time_start}
                            onChange={(e) => createTenderState.handleSimpleInput('reception_time_start', e.currentTarget.value, addTwoDots)}
                            type="text" className={`${styles.input} ${styles.firstSections__responses__inputs__input2}`} />
                    </div>
                    <div className={`${datesStyles.dateTime} ${datesStyles.dateTime2}`}>
                        <span className={styles.firstSections__responses__inputs__span}></span>
                        <input
                            placeholder="00:00"
                            maxLength={5}
                            value={createTenderState.reception_time_end}
                            onChange={(e) => createTenderState.handleSimpleInput('reception_time_end', e.currentTarget.value, addTwoDots)}
                            type="text" className={`${styles.input} ${styles.firstSections__responses__inputs__input2}`} />
                    </div>
                </div>
            </div>
            <div className={`${styles.firstSections__div}`}>
                <div className={`${styles.firstSections__div__title}`}>
                    <p className={`${styles.firstSections__div__title__p}`}>Стоимость</p>
                    <Switch aria-hidden={false} className={`${styles.SwitchNextUI} ${createTenderState.is_NDS ? styles.SwitchNextUIOn : ''}`} isSelected={createTenderState.is_NDS} onValueChange={() => createTenderState.handleSimpleInput('is_NDS', !createTenderState.is_NDS)}>
                        вкл. НДС
                    </Switch>
                </div>
                <div className={`${styles.firstSections__div__main}`}>
                    <div className={`${styles.firstSections__div__main__block}`}>
                        <p className={`${styles.firstSections__div__main__block__p}`}>Стоимость в рублях</p>
                        <input
                            onFocus={() => createTenderState.removeError('price')}
                            onBlur={() => { !+createTenderState.price && createTenderState.addError('price'); +createTenderState.price === 0 && createTenderState.handleSimpleInput("price", "") }}
                            value={createTenderState.price}
                            onChange={(e) => createTenderState.handleSimpleInput('price', e.currentTarget.value, checkOnlyNumber)}
                            className={`${styles.input} ${styles.firstSections__div__main__block__input} ${createTenderState.errors.includes('price') && !createTenderState.is_contract_price ? styles.inputError : ''}`}
                            type="text" />
                        {createTenderState.errors.includes('price') && !createTenderState.is_contract_price && <p className={`${styles.inputErrorText} ${styles.inputErrorTextPrice} ${styles.inputErrorTenderPrice}`}>Обязательно для заполнения</p>}
                    </div>
                    <div className={`${styles.firstSections__div__main__block} ${styles.CheckboxNextUI__block}`}>
                        <span className={`${styles.CheckboxNextUI__block__span}`}></span>
                        <Checkbox onValueChange={() => createTenderState.handleSimpleInput('is_contract_price', !createTenderState.is_contract_price)} className={`${styles.CheckboxNextUI} ${createTenderState.is_contract_price ? styles.CheckboxNextUIActive : ''} ${styles.CheckboxNextUIIsContract}`} isSelected={createTenderState.is_contract_price}>
                            Договорная
                        </Checkbox>
                    </div>
                </div>
            </div>
            <div className={`${styles.firstSections__div} ${styles.firstSections__responses}`}>
                <div className={`${styles.firstSections__div__title}`}>
                    <p className={`${styles.firstSections__div__title__p}`}>Оказание улуг</p>
                </div>
                <div className={`${styles.firstSections__div__main} ${styles.firstSections__div__mainWork}`}>
                    <p className={`${styles.firstSections__div__main__block__p}`}>Начало</p>
                    <p className={`${styles.firstSections__div__main__block__p}`}>Окончание</p>
                    <DateRangePickerLocal timeToChangeStart="work_start" timeToChangeEnd="work_end" />
                </div>
            </div>
        </div>
    );
})

export default Dates;