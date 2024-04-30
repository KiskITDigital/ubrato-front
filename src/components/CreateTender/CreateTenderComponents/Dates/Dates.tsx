import { FC } from "react";
import styles from '../../CreateTender.module.css'
import { useCreateTenderState } from "@/store/createTenderStore";
import { Checkbox, Switch } from "@nextui-org/react";
import { addTwoDots, checkOnlyNumber } from "../../funcs";
import ReactDatePicker from "react-datepicker";

const Dates: FC = () => {
    const createTenderState = useCreateTenderState()

    return (
        <div className={`${styles.firstSections}`}>
            <div className={`${styles.firstSections__div} ${styles.firstSections__responses}`}>
                <div className={`${styles.firstSections__div__title}`}>
                    <p className={`${styles.firstSections__div__title__p}`}>Прием откликов</p>
                </div>
                <div className={`${styles.firstSections__div__main}`}>
                    <div className={`${styles.firstSections__div__main__block}`}>
                        <p className={`${styles.firstSections__div__main__block__p}`}>Начало</p>
                        <div className={styles.firstSections__responses__inputs}>
                            <ReactDatePicker
                                className={`${styles.input} ${styles.firstSections__responses__inputs__input1}`}
                                // selected={startDate}
                                selected={createTenderState.reception_start}
                                // onChange={(date) => setStartDate(date!)}
                                onChange={(date) => createTenderState.handleSimpleInput('reception_start', date!)}
                                selectsStart
                                dateFormat="dd.MM.yyyy"
                                // startDate={startDate}
                                startDate={createTenderState.reception_start}
                                // endDate={endDate}
                                endDate={createTenderState.reception_end}
                            />
                            <span className={styles.firstSections__responses__inputs__span}></span>
                            <input maxLength={5} value={createTenderState.reception_time_start} onChange={(e) => createTenderState.handleSimpleInput('reception_time_start', e.currentTarget.value, addTwoDots)} type="text" className={`${styles.input} ${styles.firstSections__responses__inputs__input2}`} />
                        </div>
                    </div>
                    <div className={`${styles.firstSections__div__main__block}`}>
                        <p className={`${styles.firstSections__div__main__block__p}`}>Окончание</p>
                        <div className={styles.firstSections__responses__inputs}>
                            <ReactDatePicker
                                className={`${styles.input} ${styles.firstSections__responses__inputs__input1}`}
                                // selected={endDate}
                                // onChange={(date) => setEndDate(date!)}
                                selected={createTenderState.reception_end}
                                onChange={(date) => createTenderState.handleSimpleInput('reception_end', date!)}
                                selectsEnd
                                dateFormat="dd.MM.yyyy"
                                startDate={createTenderState.reception_start}
                                endDate={createTenderState.reception_end}
                                // minDate={startDate}
                                minDate={createTenderState.reception_start}
                            />
                            <span className={styles.firstSections__responses__inputs__span}></span>
                            <input maxLength={5} value={createTenderState.reception_time_end} onChange={(e) => createTenderState.handleSimpleInput('reception_time_end', e.currentTarget.value, addTwoDots)} type="text" className={`${styles.input} ${styles.firstSections__responses__inputs__input2}`} />
                        </div>
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
                            onBlur={() => !createTenderState.price && createTenderState.addError('price')}
                            value={createTenderState.price}
                            onChange={(e) => createTenderState.handleSimpleInput('price', e.currentTarget.value, checkOnlyNumber)}
                            className={`${styles.input} ${styles.firstSections__div__main__block__input} ${createTenderState.errors.includes('price') ? styles.inputError : ''}`}
                            type="text" />
                        {createTenderState.errors.includes('price') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextPrice} ${styles.inputErrorTenderPrice}`}>Обязательно для заполнения</p>}
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
                <div className={`${styles.firstSections__div__main}`}>
                    <div className={`${styles.firstSections__div__main__block}`}>
                        <p className={`${styles.firstSections__div__main__block__p}`}>Начало</p>
                        <ReactDatePicker
                            className={`${styles.input} ${styles.firstSections__div__main__block__input}`}
                            // selected={startDate2}
                            // onChange={(date) => setStartDate2(date!)}
                            selected={createTenderState.work_start}
                            onChange={(date) => createTenderState.handleSimpleInput('work_start', date!)}
                            selectsStart
                            dateFormat="dd.MM.yyyy"
                            // startDate={startDate2}
                            // endDate={endDate2}
                            startDate={createTenderState.work_start}
                            endDate={createTenderState.work_end}
                        />
                    </div>
                    <div className={`${styles.firstSections__div__main__block}`}>
                        <p className={`${styles.firstSections__div__main__block__p}`}>Окончание</p>
                        <ReactDatePicker
                            className={`${styles.input} ${styles.firstSections__div__main__block__input}`}
                            selected={createTenderState.work_end}
                            onChange={(date) => createTenderState.handleSimpleInput('work_end', date!)}
                            selectsEnd
                            dateFormat="dd.MM.yyyy"
                            startDate={createTenderState.work_start}
                            endDate={createTenderState.work_end}
                            minDate={createTenderState.work_start}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dates;