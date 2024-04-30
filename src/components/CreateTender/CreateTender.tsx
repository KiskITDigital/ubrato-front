import { FC, useEffect, useState } from "react";
import styles from './CreateTender.module.css'
// import refreshImg from '../../../public/create-tender/refresh.svg'
// import arrowRightImg from '../../../public/create-tender/arrow-right.svg'
// import changeAttachmentImg from '../../../public/create-tender/change-attachment.svg'
// import removeAttachmentImg from '../../../public/create-tender/remove-attachment.svg'
// // import checkMarkImg from '../../../public/create-tender/checkmark.svg'
// import plusImg from '../../../public/create-tender/plus.svg'
// import closeImg from '../../../public/create-tender/close.svg'
// import closeGrayImg from '../../../public/create-tender/close-gray.svg'
// import fileImg from '../../../public/create-tender/file.svg'
// import imgMobileImg from '../../../public/create-tender/img-mobile.svg'
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// // import downloadImg from '../../../public/create-tender/download-image.svg'
// import closeWhiteImg from '../../../public/create-tender/close-white.svg'
// import citiesAutocompleteCheckmarkImg from '../../../public/create-tender/cities-autocomplete-checkmark.svg'
// import { CheckboxGroup, Checkbox, Switch } from "@nextui-org/react";
// import { useCreateTenderState } from "@/store/createTenderStore";
// import { addTwoDots, checkFloorSpace, checkOnlyNumber, formatDate, formatFileSize } from "./funcs";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// import { useTypesObjectsStore } from "@/store/objectsStore";
// import { useCleaningTypeStore } from "@/store/cleaningTypeStore";
// import { createTender } from "@/api/createTender";
import Title from "./CreateTenderComponents/Title/Title";
import CleaningTZ from "./CreateTenderComponents/CleaningTZ/CleaningTZ";
import NameTender from "./CreateTenderComponents/NameTender/NameTender";
import City from "./CreateTenderComponents/City/City";
import Object from "./CreateTenderComponents/Object/Object";
import Services from "./CreateTenderComponents/Services/Services";
import Description from "./CreateTenderComponents/Description/Description";
import Wishes from "./CreateTenderComponents/Wishes/Wishes";
import Attachments from "./CreateTenderComponents/Attachments/Attachments";
import SendButtons from "./CreateTenderComponents/SendButtons/SendButtons";
import Dates from "./CreateTenderComponents/Dates/Dates";

export const CreateTender: FC = () => {
    const status = 'создание тендера'
    const [switcher, setSwitcher] = useState('Тендер');

    const [windowWidth, setWindowWidth] = useState<number>(1920);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () => { setWindowWidth(window.innerWidth); });
    }, []);

    return (
        <div className={`container ${styles.container}`}>
            {/* <div className={`${styles.title}`}>
                <p className={`${styles.title__p} ${styles.textBlack60} ${styles.textRegular}`}>Статус: <span className={`${styles.textBlack} ${styles.textMedium}`}>{'Создание тендера'}</span></p>
            </div> */}
            <Title />
            {/* <div className={`${styles.nameTender}`}>
                <label className={`${styles.nameTender__label} ${styles.textBlack60} ${styles.textRegular}`}>Название тендера:</label>
                <input
                    onFocus={() => createTenderState.removeError('name')}
                    onBlur={() => !createTenderState.name && createTenderState.addError('name')}
                    type="text"
                    className={`${styles.nameTender__input} ${styles.input} ${createTenderState.errors.includes('name') ? styles.inputError : ''}`}
                    value={createTenderState.name}
                    onChange={(e) => createTenderState.handleSimpleInput("name", e.currentTarget.value)}
                />
                {createTenderState.errors.includes('name') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextName} ${styles.inputErrorTenderName}`}>Обязательно для заполнения</p>}
            </div> */}
            <NameTender />
            <div className={`${styles.switcher}`}>
                <div onClick={() => setSwitcher('Тендер')} className={`${styles.switcher__div} ${switcher === 'Тендер' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Тендер' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Тендер</p></div>
                {status !== 'создание тендера' && (<>
                    <div className={`${styles.switcher__div}`}><span className={`${styles.switcher__span}`}></span></div>
                    <div onClick={() => setSwitcher('Отклики')} className={`${styles.switcher__div} ${switcher === 'Отклики' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Отклики' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Отклики</p><p className={`${styles.switcher__p2}`}>{2}</p></div>
                    <div className={`${styles.switcher__div}`}><span className={`${styles.switcher__span}`}></span></div>
                    <div onClick={() => setSwitcher('Чат')} className={`${styles.switcher__div} ${switcher === 'Чат' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Чат' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Чат</p><p className={`${styles.switcher__p2}`}>{34}</p></div>
                    <div className={`${styles.switcher__div}`}><span className={`${styles.switcher__span}`}></span></div>
                    <div onClick={() => setSwitcher('Доп. информация')} className={`${styles.switcher__div} ${switcher === 'Доп. информация' ? `${styles.borderBottomBlue}` : ''}`}><p className={`${styles.switcher__p} ${switcher === 'Доп. информация' ? `${styles.textMedium} ${styles.textBlack}` : `${styles.textReguar} ${styles.textBlack60}`}`}>Доп. информация</p></div>
                </>)}
                {
                    windowWidth > 1050 &&
                    <div className={`${styles.switcher__div} ${styles.switcher__lastdiv}`}>
                        <img src="/create-tender/create-tender-refresh.svg" alt="refresh" />
                        <p className={`${styles.switcher__p} ${styles.textBlack40}`}>Автосохранение черновика</p>
                    </div>
                }
            </div>
            {
                windowWidth <= 1050 &&
                <div className={`${styles.switcher__div} ${styles.switcher__lastdiv} ${styles.switcher__lastdivMobile}`}>
                    <img src="/create-tender/create-tender-refresh.svg" alt="refresh" />
                    <p className={`${styles.switcher__p} ${styles.textBlack40}`}>Автосохранение черновика</p>
                </div>
            }
            {switcher === 'Тендер' &&
                (
                    <>
                        {/* <div className={`${styles.firstSections}`}>
                            <div className={`${styles.firstSections__div} ${styles.firstSections__responses}`}>
                                <div className={`${styles.firstSections__div__title}`}>
                                    <p className={`${styles.firstSections__div__title__p}`}>Прием откликов</p>
                                </div>
                                <div className={`${styles.firstSections__div__main}`}>
                                    <div className={`${styles.firstSections__div__main__block}`}>
                                        <p className={`${styles.firstSections__div__main__block__p}`}>Начало</p>
                                        <div className={styles.firstSections__responses__inputs}>
                                            <DatePicker
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
                                            <DatePicker
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
                                        <DatePicker
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
                                        <DatePicker
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
                        </div> */}
                        <Dates />
                        {/* <div className={`${styles.section} ${styles.cleaningTZ}`}>
                            <div className={`${styles.section__block}`}>
                                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>ТЗ на уборку:</p>
                                <button className={`${styles.section__block__button} ${styles.textRegular}`}><img src={plusImg} alt="plus" />Заполнить</button>
                            </div>
                        </div> */}
                        <CleaningTZ />
                        {/* <div className={`${styles.section}`}>
                            <div className={`${styles.section__block} ${styles.city}`}>
                                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Город и регион:</p>
                                <div className={`${styles.services__block} ${styles.services__cities}`}>
                                    {
                                        (isCitiesAutoComplete || !createTenderState.city) ? <>
                                            <input
                                                onFocus={() => { createTenderState.removeError('city'); setIsCitiesAutoComplete(true) }}
                                                onBlur={() => {
                                                    setIsCitiesAutoComplete(false);
                                                    // console.log(createTenderState.cities);
                                                    if (createTenderState.cities.length) {
                                                        createTenderState.handleSimpleInput('city', createTenderState.cities[0].name)
                                                    } else {
                                                        createTenderState.addError('city');
                                                        createTenderState.handleSimpleInput('city', '')
                                                    }
                                                }}
                                                value={createTenderState.city}
                                                onChange={(e) => { createTenderState.handleSimpleInput('city', e.currentTarget.value); createTenderState.getCities(e.currentTarget.value) }}
                                                type="text"
                                                className={`${styles.input} ${styles.cities__input} ${createTenderState.errors.includes('city') ? styles.inputError : ''}`} />
                                            {createTenderState.errors.includes('city') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace} ${styles.inputErrorTextCity}`}>Обязательно для заполнения</p>}
                                            {
                                                isCitiesAutoComplete && !!createTenderState.city.length && !!createTenderState.cities.length && <div className={styles.cities__autocomplete}>
                                                    {
                                                        createTenderState.cities.map((city) =>
                                                            <p className={styles.cities__autocomplete__item}
                                                                key={city.id}
                                                                onMouseDown={(e) => { e.stopPropagation(); createTenderState.handleSimpleInput('city', city.name) }}
                                                            >
                                                                {city.name}
                                                                <span>{city.region}</span>
                                                                <img src={citiesAutocompleteCheckmarkImg} alt="" />
                                                            </p>)
                                                    }
                                                </div>
                                            }
                                        </>
                                            : <p className={`${styles.services__block__service__type} ${styles.section__block__add__object__objectCategory} ${styles.city__autocomplete__chosen}`}>
                                                {createTenderState.city}
                                                <span className={`${styles.section__block__add__object__objectCategory__span}`}></span>
                                                <img onClick={() => createTenderState.handleSimpleInput('city', '')} className={`${styles.section__block__add__object__objectCategory__img}`} src={closeWhiteImg} alt="" />
                                            </p>
                                    }
                                </div>
                            </div>
                        </div> */}
                        <City />

                        {/* <div className={`${styles.section} ${styles.object}`}>
                            <div className={`${styles.section__block}`}>
                                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Объект:</p>
                                {
                                    windowWidth <= 1050 ? (<>
                                        <button
                                            onClick={() => { setIsChoosingObjectNameMobile(prev => !prev); createTenderState.addObject('', []) }}
                                            className={`${styles.section__block__button} ${styles.textRegular} ${createTenderState.errors.includes('object') ? styles.section__block__buttonError : ''}`}
                                        >
                                            <img src={(createTenderState.objectName || isChoosingObjectNameMobile) ? closeImg : plusImg} alt="plus" />
                                            {createTenderState.objectName || 'Добавить объект'}
                                        </button>
                                        {
                                            createTenderState.objectName &&
                                            <CheckboxGroup
                                                //  onChange={(e) => setObjectTypeChosen(e.currentTarget.value)} label=""
                                                label=""
                                                defaultValue={[]}
                                                // className={styles.object__services__types__checkboxGroup}
                                                className={`${styles.checkbox__mobile}`}
                                                value={createTenderState.objectCategory}
                                                onValueChange={(newObjectTypes) => { createTenderState.addObject(createTenderState.objectName, newObjectTypes); createTenderState.removeError('object') }}
                                            >
                                                {
                                                    // choosingObjectTypes?.map(type => <Checkbox className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${createTenderState.objectCategory.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`} key={type.id} value={type.name}>{type.name}</Checkbox>)
                                                    objectsStore.apiObjects?.find(el => el.name === createTenderState.objectName)?.types.map(type => <Checkbox className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${createTenderState.objectCategory.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`} key={type.id} value={type.name}>{type.name}</Checkbox>)
                                                }

                                            </CheckboxGroup>
                                        }
                                        {
                                            isChoosingObjectNameMobile && <div
                                                // onBlur={() => setIsChoosingObjectNameMobile(false)}
                                                className={`${styles.cities__autocomplete} ${styles.objectTypesSelectorMobile}`}>
                                                {
                                                    objectsStore.apiObjects.map((object: { id: number, name: string, total: number, types: { id: number, name: string }[] }) =>
                                                        <p
                                                            onClick={() => { createTenderState.handleSimpleInput('objectName', object.name); setIsChoosingObjectNameMobile(false); setChoosingObjectTypes(object.types.map(object => ({ ...object, count: 0 }))) }}
                                                            className={styles.cities__autocomplete__item}
                                                            key={object.id}
                                                        >
                                                            {object.name} <img src={citiesAutocompleteCheckmarkImg} alt="" />
                                                        </p>
                                                    )
                                                }
                                            </div>
                                        }
                                        {createTenderState.errors.includes('object') && <p className={`${styles.inputErrorText} ${styles.objectError}`}>Обязательно для заполнения</p>}
                                    </>) :
                                        <div className={`${styles.section__block__add__object}`}>
                                            {!!createTenderState.objectCategory.length && <div className={`${styles.services__block__service} ${styles.object__block__service}`}>
                                                <p className={`${styles.service__name}`}>{createTenderState.objectName}</p>
                                                <img className={styles.service__name__img} src={arrowRightImg} alt="" />
                                                <div className={`${styles.services__block__service__types}`}>
                                                    {
                                                        createTenderState.objectCategory.map((type, ind) => <p key={ind} className={`${styles.services__block__service__type} ${styles.section__block__add__object__objectCategory}`}>
                                                            {type}
                                                            <span className={`${styles.section__block__add__object__objectCategory__span}`}></span>
                                                            <img onClick={() => {
                                                                createTenderState.removeObjectType(ind);
                                                                setChooseTypesTypesToObjectToAddObject(prev => prev.filter((_, i) => i !== ind));
                                                                if (createTenderState.objectCategory.length === 1) {
                                                                    createTenderState.handleSimpleInput('objectName', '')
                                                                    setIsObjectChoosed(null)
                                                                }
                                                            }} className={`${styles.section__block__add__object__objectCategory__img}`} src={closeWhiteImg} alt="" />
                                                        </p>)
                                                    }
                                                </div>
                                            </div>}
                                            <button
                                                className={`${styles.section__block__button} ${styles.textRegular} ${(createTenderState.objectName || isChoosingObject) ? styles.section__block__button__end : ''} ${createTenderState.errors.includes('object') ? styles.section__block__buttonError : ''}`}
                                                onClick={() => { setIsChoosingObject(prev => !prev); }}
                                            >{
                                                    (createTenderState.objectName && !isChoosingObject) ?
                                                        'Изменить' :
                                                        isChoosingObject ?
                                                            <>
                                                                <img src={closeImg} alt="close" />
                                                                Отмена
                                                            </> :
                                                            <>
                                                                <img src={plusImg} alt="plus" />
                                                                Добавить объект
                                                            </>
                                                }</button>
                                            {createTenderState.errors.includes('object') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace} ${styles.objectError} ${(createTenderState.objectName || isChoosingObject) ? styles.objectErrorRight : ''}`}>Обязательно для заполнения</p>}
                                        </div>
                                }
                            </div>
                            {
                                isChoosingObject && windowWidth > 1050 && <div
                                    className={`${styles.object__types} ${choosingObjectTypes ? '' : styles.object__typesHalf}`}
                                //  className={`${styles.object__objects} ${choosingObjectTypes ? '' : styles.object__objectsEmpty}`}
                                >
                                    <div
                                    //  className={styles.object__objects__objects}
                                    >
                                        {
                                            objectsStore.apiObjects.map((object: { id: number, name: string, total: number, types: { id: number, name: string }[] }) => <p className={`${styles.object__objects__objects__p} ${object.name === isObjectChoosed ? styles.object__objects__objects__pSelected : ''}`} onClick={() => { setChoosingObjectTypes(object.types.map(el => ({ id: el.id, name: el.name, count: 0 }))); setIsObjectChoosed(object.name); setChooseTypesTypesToObjectToAddObject([]) }} key={object.id}>{object.name} {object.name === isObjectChoosed && <img src={arrowRightImg} alt="" />}</p>)
                                        }
                                    </div>
                                    {!!choosingObjectTypes?.length &&
                                        <div
                                        // className={`${choosingObjectTypes ? '' : styles.object__objects__typesEmpty}`}
                                        // className={`${styles.object__objects__types} ${choosingObjectTypes ? '' : styles.object__objects__typesEmpty}`}
                                        >
                                            {
                                                isObjectChoosed && (<>
                                                    <CheckboxGroup
                                                        //  onChange={(e) => setObjectTypeChosen(e.currentTarget.value)} label=""
                                                        label=""
                                                        defaultValue={[]}
                                                        // className={styles.object__services__types__checkboxGroup}
                                                        value={chooseTypesTypesToObjectToAddObject}
                                                        onValueChange={setChooseTypesTypesToObjectToAddObject}
                                                    >
                                                        {
                                                            choosingObjectTypes!.map(type => <Checkbox className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${chooseTypesTypesToObjectToAddObject.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`} key={type.id} value={type.name}>{type.name}</Checkbox>)
                                                        }

                                                    </CheckboxGroup>
                                                    <button onClick={() => {
                                                        if (chooseTypesTypesToObjectToAddObject.length) {
                                                            // createTenderState.handleSimpleInput('objectName', isObjectChoosed!);
                                                            // createTenderState.handleSimpleInput('objectCategory', objectTypeChosen!);
                                                            // createTenderState.addObject('', [])
                                                            createTenderState.removeError('object')
                                                            createTenderState.addObject(isObjectChoosed!, chooseTypesTypesToObjectToAddObject)
                                                            setIsChoosingObject(false)
                                                            // setObjectTypeChosen(null)
                                                        }
                                                    }} className={styles.object__objects__types__button} disabled={!chooseTypesTypesToObjectToAddObject.length}>Применить</button>
                                                </>)
                                            }
                                        </div>}
                                </div>
                            }
                            <div className={`${styles.section__block} ${styles.square}`}>
                                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Площадь:</p>
                                <input
                                    onFocus={() => createTenderState.removeError('floor_space')}
                                    onBlur={() => !createTenderState.floor_space && createTenderState.addError('floor_space')}
                                    value={createTenderState.floor_space}
                                    onChange={(e) => createTenderState.handleSimpleInput('floor_space', e.currentTarget.value, checkFloorSpace)}
                                    type="text"
                                    className={`${styles.input} ${styles.square__input} ${createTenderState.errors.includes('floor_space') ? styles.inputError : ''}`}
                                /><label className={`${styles.square__label} ${styles.textReguar} ${styles.textBlack50}`} htmlFor="">кв. м.</label>
                                {createTenderState.errors.includes('floor_space') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace}`}>Обязательно для заполнения</p>}
                            </div>
                        </div> */}
                        <Object windowWidth={windowWidth} />


                        {/* <div className={`${styles.section} ${styles.services}`}>
                            <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Услуги:</p>
                            {windowWidth <= 1050 ? (<>
                                {
                                    createTenderState.services.map(service =>
                                        <Fragment key={service.id}>
                                            <button onClick={() => { createTenderState.removeService(service.id) }} className={`${styles.section__block__button} ${styles.textRegular}`}><img src={closeImg} alt="close" />{service.name}</button>
                                            <CheckboxGroup
                                                //  onChange={(e) => setObjectTypeChosen(e.currentTarget.value)} label=""
                                                label=""
                                                defaultValue={[]}
                                                // className={styles.object__services__types__checkboxGroup}
                                                className={`${styles.checkbox__mobile}`}
                                                value={service.types.map(type => type.name)}
                                                onValueChange={(newServiceTypes => {
                                                    // console.log(newServiceTypes, service.types)
                                                    createTenderState.changeService(service.id, service.name, newServiceTypes)
                                                })}
                                            // onValueChange={(newObjectTypes) => { console.log(newObjectTypes); createTenderState.addObject(createTenderState.objectName, newObjectTypes) }}
                                            >
                                                {
                                                    cleaningTypeStore.apiCleaningTypes.find(ser =>
                                                        ser.name === service.name)?.types.map(type =>
                                                            <Checkbox
                                                                // className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${chooseTypesTypesToObjectToChangeService.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`}
                                                                className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${service.types.some(el => el.name === type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`}
                                                                key={type.id} value={type.name}>{type.name}
                                                            </Checkbox>)
                                                }

                                            </CheckboxGroup>
                                        </Fragment>
                                    )
                                }
                                <button
                                    onClick={() => { setIsChoosingNewServiceNameMobile(prev => !prev) }}
                                    className={`${styles.section__block__button} ${styles.textRegular} ${createTenderState.errors.includes('object') ? styles.section__block__buttonError : ''}`}
                                >
                                    <img src={(isChoosingNewServiceNameMobile) ? closeImg : plusImg} alt="plus" />
                                    Добавить услуги
                                </button>
                                {createTenderState.errors.includes('services') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace} ${styles.servicesError}`}>Обязательно для заполнения</p>}
                                {
                                    isChoosingNewServiceNameMobile && <div
                                        // onBlur={() => setIsChoosingObjectNameMobile(false)}
                                        className={`${styles.cities__autocomplete} ${styles.objectTypesSelectorMobile}`}>
                                        {
                                            cleaningTypeStore.apiCleaningTypes.map((service) => !createTenderState.services.some(el => el.name === service.name) &&
                                                <p
                                                    onClick={() => { setIsChoosingNewServiceNameMobile(false); createTenderState.addService(service.name, []) }}
                                                    className={styles.cities__autocomplete__item}
                                                    key={service.id}
                                                >
                                                    {service.name} <img src={citiesAutocompleteCheckmarkImg} alt="" />
                                                </p>
                                            )
                                        }
                                    </div>
                                }
                            </>) :
                                <div className={`${styles.services__block}`}>
                                    {createTenderState.services.length > 0 && <div className={styles.services__block__services}>
                                        {
                                            createTenderState.services.map(service =>
                                                <div className={styles.services__block__serviceToChange} key={service.id}>
                                                    <div key={service.id} className={`${styles.services__block__service}`}>
                                                        <p className={`${styles.service__name}`}>{service.name}</p>
                                                        <img className={styles.service__name__img} src={arrowRightImg} alt="" />
                                                        <div className={`${styles.services__block__service__types}`}>
                                                            {
                                                                service.types.map(type => <p key={type.id} className={`${styles.services__block__service__type} ${styles.section__block__add__object__objectCategory}`}>
                                                                    {type.name}
                                                                    <span className={`${styles.section__block__add__object__objectCategory__span}`}></span>
                                                                    <img onClick={() => createTenderState.removeServiceType(service.id, type.id)} className={`${styles.section__block__add__object__objectCategory__img}`} src={closeWhiteImg} alt="" />
                                                                </p>)
                                                            }
                                                        </div>
                                                        <button
                                                            onClick={() => { setIsChoosingServiceToChange(service.id); setChooseTypesNameToObjectToChangeService(service.name); setChooseTypesTypesToObjectToChangeService(service.types.map(type => type.name)) }}
                                                            className={`${styles.section__block__button} ${styles.service__button} ${styles.services__block__service__change}`}>Изменить</button>
                                                        <button onClick={() => createTenderState.removeService(service.id)} className={`${styles.section__block__button} ${styles.service__button} ${styles.services__block__service__remove}`}><img src={closeImg} alt="" /></button>
                                                    </div>

                                                    {isChoosingServiceToChange === service.id && <div
                                                        //  className={`${styles.object__objects} ${styles.service__objects}`}
                                                        className={`${styles.object__types} ${styles.services__types}`}
                                                    >
                                                        <div
                                                        //  className={styles.object__objects__objects}
                                                        >
                                                            {
                                                                cleaningTypeStore.apiCleaningTypes.map((service) => !createTenderState.services.some(el => el.name === service.name) &&
                                                                    <p onClick={() => { setChooseTypesNameToObjectToChangeService(service.name); setChooseTypesTypesToObjectToChangeService([]) }} className={`${styles.object__objects__objects__p} ${service.name === chooseTypesNameToObjectToChangeService ? styles.object__objects__objects__pSelected : ''}`} key={service.id}>{service.name} {service.name === chooseTypesNameToObjectToChangeService && <img src={arrowRightImg} alt="" />}</p>)
                                                            }
                                                        </div>
                                                        <div
                                                        // className={`${styles.services__object__types} ${styles.object__objects__types} ${chooseTypesNameToObjectToChangeService ? '' : styles.object__objects__typesEmpty}`}
                                                        >
                                                            {
                                                                chooseTypesNameToObjectToChangeService && (<>
                                                                    <CheckboxGroup
                                                                        label=""
                                                                        defaultValue={chooseTypesTypesToObjectToChangeService}
                                                                        // className={`${styles.object__services__types__checkboxGroup} ${styles.object__services__types__checkboxGroup2}`}
                                                                        value={chooseTypesTypesToObjectToChangeService}
                                                                        onValueChange={setChooseTypesTypesToObjectToChangeService}
                                                                    >
                                                                        {
                                                                            cleaningTypeStore.apiCleaningTypes.find(service =>
                                                                                service.name === chooseTypesNameToObjectToChangeService)?.types.map(type =>
                                                                                    <Checkbox
                                                                                        className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${chooseTypesTypesToObjectToChangeService.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`}
                                                                                        key={type.id} value={type.name}>{type.name}
                                                                                    </Checkbox>)
                                                                        }
                                                                    </CheckboxGroup>
                                                                    <button onClick={() => {
                                                                        if (chooseTypesTypesToObjectToChangeService.length) {
                                                                            // createTenderState.addService(chooseTypesNameToObjectToChangeService, chooseTypesTypesToObjectToChangeService)
                                                                            createTenderState.changeService(isChoosingServiceToChange, chooseTypesNameToObjectToChangeService, chooseTypesTypesToObjectToChangeService)
                                                                            setChooseTypesTypesToObjectToChangeService([])
                                                                            setChooseTypesNameToObjectToChangeService(null)
                                                                            setIsChoosingServiceToChange(null)
                                                                            // setIsChoosingServiceToAdd(false)

                                                                        }
                                                                    }} className={styles.object__objects__types__button} disabled={!chooseTypesTypesToObjectToChangeService.length}>Применить</button>
                                                                </>)
                                                            }

                                                        </div>
                                                    </div>}


                                                </div>
                                            )
                                        }
                                    </div>}
                                    <button onClick={() => { setIsChoosingServiceToAdd(prev => !prev); setChooseTypesNameToObjectToAddService(null) }} className={`${styles.section__block__button} ${styles.service__button} ${styles.textRegular} ${createTenderState.errors.includes('services') ? styles.section__block__buttonError : ''}`}><img src={isChoosingServiceToAdd ? closeImg : plusImg} alt="plus" />{isChoosingServiceToAdd ? 'Отмена' : 'Добавить услугу'}</button>
                                    {createTenderState.errors.includes('services') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace} ${styles.servicesError}`}>Обязательно для заполнения</p>}
                                    {
                                        isChoosingServiceToAdd && <div
                                            className={`${styles.object__types} ${styles.services__types} ${chooseTypesNameToObjectToAddService ? '' : `${styles.object__typesHalf} ${styles.services__typesHalf}`}`}
                                        // className={`${styles.object__objects} ${styles.service__objects}`}
                                        >
                                            <div
                                            // className={styles.object__objects__objects}
                                            >
                                                {
                                                    cleaningTypeStore.apiCleaningTypes.map((service) => !createTenderState.services.some(el => el.name === service.name) &&
                                                        <p onClick={() => { setChooseTypesNameToObjectToAddService(service.name); setChooseTypesTypesToObjectToAddService([]) }} className={`${styles.object__objects__objects__p} ${service.name === chooseTypesNameToObjectToAddService ? styles.object__objects__objects__pSelected : ''}`} key={service.id}>{service.name} {service.name === chooseTypesNameToObjectToAddService && <img src={arrowRightImg} alt="" />}</p>)
                                                }
                                            </div>
                                            {
                                                !!chooseTypesNameToObjectToAddService?.length &&
                                                <div
                                                // className={`${chooseTypesNameToObjectToAddService ? '' : styles.object__objects__typesEmpty}`}
                                                // className={`${styles.object__objects__types} ${styles.services__object__types} ${chooseTypesNameToObjectToAddService ? '' : styles.object__objects__typesEmpty}`}
                                                >
                                                    {
                                                        chooseTypesNameToObjectToAddService && (<>
                                                            <CheckboxGroup
                                                                label=""
                                                                defaultValue={[]}
                                                                // className={styles.object__services__types__checkboxGroup}
                                                                value={chooseTypesTypesToObjectToAddService}
                                                                onValueChange={setChooseTypesTypesToObjectToAddService}
                                                            >
                                                                {
                                                                    cleaningTypeStore.apiCleaningTypes.find(service => service.name === chooseTypesNameToObjectToAddService)?.types.map(type => <Checkbox className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${chooseTypesTypesToObjectToAddService.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`} key={type.id} value={type.name}>{type.name}</Checkbox>)
                                                                }
                                                            </CheckboxGroup>
                                                            <button onClick={() => {
                                                                if (chooseTypesTypesToObjectToAddService.length) {
                                                                    createTenderState.addService(chooseTypesNameToObjectToAddService, chooseTypesTypesToObjectToAddService)
                                                                    setChooseTypesTypesToObjectToAddService([])
                                                                    setChooseTypesNameToObjectToAddService(null)
                                                                    setIsChoosingServiceToAdd(false)
                                                                }
                                                            }} className={styles.object__objects__types__button} disabled={!chooseTypesTypesToObjectToAddService.length}>Применить</button>
                                                        </>)
                                                    }

                                                </div>}
                                        </div>
                                    }
                                </div>
                            }
                        </div> */}
                        <Services windowWidth={windowWidth} />

                        {/* <div className={`${styles.section} ${styles.description}`}>
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
                        </div> */}
                        <Description />

                        {/* <div className={`${styles.section} ${styles.wishes}`}>
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
                        </div> */}
                        <Wishes />

                        {/* <div className={`${styles.section} ${styles.attachments}`}>
                            <div className={`${styles.section__block}`}>
                                <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Вложения:</p>
                                <div className={`${styles.section__attachments__block}`}>
                                    {!!createTenderState.attachments.length &&
                                        <div className={`${styles.section__attachments__block__cardList}`}>
                                            {
                                                createTenderState.attachments.map((img, ind) => <div key={img.id} className={`${styles.section__attachments__block__cardItem}`}>
                                                    {
                                                        (img.fileType === 'image' && windowWidth > 1050) ?
                                                            <img className={`${styles.section__attachments__block__cardItem__img}`} src={ind < createTenderState.attachments.length ? img.linkToSend : plusImg} alt="" /> :
                                                            <div className={`${styles.section__attachments__block__cardItem__img} ${styles.section__attachments__block__cardItem__notImage}`}>
                                                                <img className={styles.section__attachments__block__cardItem__notImageInfo__img} src={img.fileType === 'image' ? imgMobileImg : fileImg} alt="" />
                                                                <div className={styles.section__attachments__block__cardItem__notImageInfo}>
                                                                    <p>
                                                                        <span className={styles.section__attachments__block__cardItem__notImageInfo__span}>{img.fileName}</span>
                                                                        , {formatFileSize(img.fileSize)}</p>
                                                                    {windowWidth <= 1050 && <img onClick={() => createTenderState.removeAttachment(img.id)} src={closeGrayImg} alt="" />}
                                                                </div>
                                                            </div>
                                                    }
                                                    {windowWidth > 1050 && <>
                                                        <p className={`${styles.section__attachments__block__cardItem__text}`}>{img.fileName}</p>
                                                        <div className={`${styles.section__attachments__block__cardItem__changes}`}>
                                                            <img className={`${styles.section__attachments__block__cardItem__changes__img}`}
                                                                src={changeAttachmentImg} alt=""
                                                                onClick={handleButtonChangeFileClick}
                                                            />
                                                            <input
                                                                type="file"
                                                                multiple
                                                                accept="image/*,.pdf,.xml"
                                                                onChange={(e) => createTenderState.handleFileUpload(e, img.id)}
                                                                ref={inputChangeFileRef}
                                                                style={{ display: 'none' }}
                                                            />
                                                            <span className={`${styles.section__attachments__block__cardItem__changes__span}`}></span>
                                                            <img onClick={() => createTenderState.removeAttachment(img.id)} className={`${styles.section__attachments__block__cardItem__changes__img}`} src={removeAttachmentImg} alt="" />
                                                            <p onClick={() => createTenderState.removeAttachment(img.id)} className={`${styles.section__attachments__block__cardItem__changes__text}`}>Удалить</p>
                                                        </div>
                                                    </>}
                                                </div>)
                                            }
                                        </div>
                                    }
                                    <button onClick={() => { createTenderState.attachments.length < 8 && handleButtonFileClick() }} disabled={createTenderState.attachments.length >= 8} className={`${styles.section__block__button} ${styles.textRegular} ${styles.section__attachments__block__button} ${createTenderState.errors.includes('attachments') ? styles.section__block__buttonError : ''}`}><img src={plusImg} alt="plus" />Добавить вложения (до 8 шт.)</button>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,.pdf,.xml"
                                        onChange={createTenderState.handleFileUpload}
                                        ref={inputFileRef}
                                        style={{ display: 'none' }}
                                    />
                                    {createTenderState.errors.includes('attachments') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextFloorSspace} ${styles.attachmentsError}`}>Обязательно для заполнения</p>}
                                </div>
                            </div>
                        </div> */}
                        <Attachments windowWidth={windowWidth} />


                        {/* <div className={`${styles.section} ${styles.sendButtons}`}>
                            <div className={`${styles.section__block}`}>
                                <p className={`${styles.section__block__p}`}></p>
                                <div className={`${styles.section__sendButtons__block}`}>
                                    <button onClick={() => { submit() }} className={styles.section__sendButtons__block__moderationButton}>Отправить на модерацию</button>
                                    <button className={styles.section__sendButtons__block__templateButton}>Сохранить как черновик</button>
                                </div>
                            </div>
                        </div> */}
                        <SendButtons />
                    </>
                )
            }
        </div >
    )
}