import { FC, useRef, useState } from "react";
import styles from './CreateTender.module.css'
import refreshImg from '../../../public/create-tender/refresh.svg'
import arrowRightImg from '../../../public/create-tender/arrow-right.svg'
import changeAttachmentImg from '../../../public/create-tender/change-attachment.svg'
import removeAttachmentImg from '../../../public/create-tender/remove-attachment.svg'
import checkMarkImg from '../../../public/create-tender/checkmark.svg'
import plusImg from '../../../public/create-tender/plus.svg'
import closeImg from '../../../public/create-tender/close.svg'
import fileImg from '../../../public/create-tender/file.svg'
import downloadImg from '../../../public/create-tender/download-image.svg'
import closeWhiteImg from '../../../public/create-tender/close-white.svg'
import citiesAutocompleteCheckmarkImg from '../../../public/create-tender/cities-autocomplete-checkmark.svg'
import { CheckboxGroup, Checkbox, Switch } from "@nextui-org/react";
import { useCreateTenderState } from "@/store/createTenderStore";
import { addTwoDots, checkFloorSpace, checkOnlyNumber } from "./masks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useTypesObjectsStore } from "@/store/objectsStore";
import { useCleaningTypeStore } from "@/store/cleaningTypeStore";

export const CreateTender: FC = () => {
    const status = 'создание тендера'
    const [switcher, setSwitcher] = useState('Тендер');
    const createTenderState = useCreateTenderState()

    const objectsStore = useTypesObjectsStore()

    const cleaningTypeStore = useCleaningTypeStore()


    const [startDate, setStartDate] = useState(new Date("2024/02/08"));
    const [endDate, setEndDate] = useState(new Date("2024/02/10"));

    const [startDate2, setStartDate2] = useState(new Date("2024/02/08"));
    const [endDate2, setEndDate2] = useState(new Date("2024/02/10"));



    const [isChoosingObject, setIsChoosingObject] = useState(false);
    const [isObjectChoosed, setIsObjectChoosed] = useState<null | string>(null);
    const [choosingObjectTypes, setChoosingObjectTypes] = useState<null | { id: number, name: string, count: number }[]>(null);
    // const [objectTypeChosen, setObjectTypeChosen] = useState<null | string>(null);


    const [chooseTypesTypesToObjectToAddObject, setChooseTypesTypesToObjectToAddObject] = useState<string[]>([]);


    const [isChoosingServiceToAdd, setIsChoosingServiceToAdd] = useState(false);
    const [chooseTypesNameToObjectToAddService, setChooseTypesNameToObjectToAddService] = useState<null | string>(null);
    const [chooseTypesTypesToObjectToAddService, setChooseTypesTypesToObjectToAddService] = useState<string[]>([]);


    // const [newServices, setNewServices] = useState<{ id: number, name: string, total: number, types: { id: number, name: string, count: number }[] }>([]);


    const [isChoosingServiceToChange, setIsChoosingServiceToChange] = useState<null | number>(null);
    const [chooseTypesNameToObjectToChangeService, setChooseTypesNameToObjectToChangeService] = useState<null | string>(null);
    const [chooseTypesTypesToObjectToChangeService, setChooseTypesTypesToObjectToChangeService] = useState<string[]>([]);



    const [images, setImages] = useState([]);

    const inputFileRef = useRef(null);

    const handleButtonFileClick = () => {
        inputFileRef.current!.click();
    };

    // const handleFileUpload = (event) => {
    //     const files = event.target.files;
    //     const newImages = [...images];

    //     for (let i = 0; i < files.length; i++) {
    //         const file = files[i];
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //             newImages.push({ id: Date.now(), data: e.target.result, text: '', isChanging: true });
    //             setImages([...newImages]);
    //         };

    //         reader.readAsDataURL(file);
    //     }
    // };
    // const handleFileUpload = (event) => {
    //     // const files = event.target.files;
    //     // const newImages = [...images];

    //     // for (let i = 0; i < files.length; i++) {
    //     const file = event.target.files
    //     const reader = new FileReader();

    //     reader.readAsText(file);

    //     reader.onload = (e) => {
    //         const newFile = { id: Date.now(), data: e.target.result, text: '', isChanging: true }
    //         setImages(prev => [...prev, newFile]);
    //         console.log(reader.result);

    //     };

    //     // reader.readAsDataURL(file);
    //     // }
    // };
    const handleFileUpload = (event) => {
        const files = event.target.files;
        const newFiles = [...files];
        const newImages = [...images];

        for (let i = 0; i < newFiles.length; i++) {
            const file = newFiles[i];
            const reader = new FileReader();

            reader.onload = (e) => {
                const fileType = file.type.split('/')[0];

                if (fileType === 'image' || file.type === 'application/pdf' || file.type === 'text/xml') {
                    newImages.push({ id: Date.now(), data: e.target.result, text: '', isChanging: true, fileType: fileType });
                    setImages([...newImages]);
                } else {
                    console.error('Неподдерживаемый тип файла:', file.type);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = (dataURL, fileName) => {
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = fileName;
        link.click();
        // document.body.removeChild(link);
    };

    // const itemClasses = {
    //     listboxWrapper: styles.listboxWrapper,
    //     listbox: styles.listbox,
    //     popoverContent: styles.popoverContent,
    // }

    const [isCitiesAutoComplete, setIsCitiesAutoComplete] = useState(false);

    return (
        <div className={`container ${styles.container}`}>
            <div className={`${styles.title}`}>
                <h1 className={`${styles.title__h1} ${styles.textBlack60} ${styles.textRegular}`}>Тендер №{'1304'}</h1>
                <p className={`${styles.title__p} ${styles.textBlack60} ${styles.textRegular}`}>Статус: <span className={`${styles.textBlack} ${styles.textMedium}`}>{'Создание тендера'}</span></p>
            </div>
            <div className={`${styles.nameTender}`}>
                <label className={`${styles.nameTender__label} ${styles.textBlack60} ${styles.textRegular}`}>Название тендера:</label>
                <input
                    // maxLength={6}
                    onFocus={() => createTenderState.removeError('name')}
                    onBlur={() => !createTenderState.name && createTenderState.addError('name')}
                    type="text"
                    className={`${styles.nameTender__input} ${styles.input} ${createTenderState.errors.includes('name') ? styles.inputError : ''}`}
                    value={createTenderState.name}
                    onChange={(e) => createTenderState.handleSimpleInput("name", e.currentTarget.value)}
                />
                {createTenderState.errors.includes('name') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextName}`}>Обязательно для заполнения</p>}
            </div>
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
                <div className={`${styles.switcher__div} ${styles.switcher__lastdiv}`}>
                    <img src={refreshImg} alt="refresh" />
                    <p className={`${styles.switcher__p} ${styles.textBlack40}`}>Автосохранение черновика</p>
                </div>
            </div>
            {switcher === 'Тендер' && (<>
                <div className={`${styles.firstSections}`}>
                    <div className={`${styles.firstSections__div} ${styles.firstSections__responses}`}>
                        <div className={`${styles.firstSections__div__title}`}>
                            <p className={`${styles.firstSections__div__title__p}`}>Прием откликов</p>
                        </div>
                        <div className={`${styles.firstSections__div__main}`}>
                            <div className={`${styles.firstSections__div__main__block}`}>
                                <p className={`${styles.firstSections__div__main__block__p}`}>Начало</p>
                                {/* <input className={`${styles.input} ${styles.firstSections__div__main__block__input}`} type="text" /> */}
                                <div className={styles.firstSections__responses__inputs}>
                                    {/* <input type="text" className={`${styles.input} ${styles.firstSections__responses__inputs__input1}`} /> */}
                                    <DatePicker
                                        className={`${styles.input} ${styles.firstSections__responses__inputs__input1}`}
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date!)}
                                        selectsStart
                                        dateFormat="dd.MM.yyyy"
                                        startDate={startDate}
                                        endDate={endDate}
                                    />
                                    <span className={styles.firstSections__responses__inputs__span}></span>
                                    <input maxLength={5} value={createTenderState.reception_time_start} onChange={(e) => createTenderState.handleSimpleInput('reception_time_start', e.currentTarget.value, addTwoDots)} type="text" className={`${styles.input} ${styles.firstSections__responses__inputs__input2}`} />
                                </div>
                            </div>
                            <div className={`${styles.firstSections__div__main__block}`}>
                                <p className={`${styles.firstSections__div__main__block__p}`}>Окончание</p>
                                {/* <input className={`${styles.input} ${styles.firstSections__div__main__block__input}`} type="text" /> */}
                                <div className={styles.firstSections__responses__inputs}>
                                    <DatePicker
                                        className={`${styles.input} ${styles.firstSections__responses__inputs__input1}`}
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date!)}
                                        selectsEnd
                                        dateFormat="dd.MM.yyyy"
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
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
                                {createTenderState.errors.includes('price') && <p className={`${styles.inputErrorText} ${styles.inputErrorTextPrice}`}>Обязательно для заполнения</p>}
                            </div>
                            <div className={`${styles.firstSections__div__main__block} ${styles.CheckboxNextUI__block}`}>
                                {/* <p className={`${styles.firstSections__div__main__block__p}`}>Окончание</p> */}
                                {/* <input className={`${styles.input} ${styles.firstSections__div__main__block__input}`} type="text" /> */}
                                <span className={`${styles.CheckboxNextUI__block__span}`}></span>
                                <Checkbox onValueChange={() => createTenderState.handleSimpleInput('is_contract_price', !createTenderState.is_contract_price)} className={`${styles.CheckboxNextUI} ${createTenderState.is_contract_price ? styles.CheckboxNextUIActive : ''}`} isSelected={createTenderState.is_contract_price}>
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
                                {/* <input className={`${styles.input} ${styles.firstSections__div__main__block__input}`} type="text" /> */}
                                <DatePicker
                                    className={`${styles.input} ${styles.firstSections__div__main__block__input}`}
                                    selected={startDate2}
                                    onChange={(date) => setStartDate2(date!)}
                                    selectsStart
                                    dateFormat="dd.MM.yyyy"
                                    startDate={startDate2}
                                    endDate={endDate2}
                                />
                            </div>
                            <div className={`${styles.firstSections__div__main__block}`}>
                                <p className={`${styles.firstSections__div__main__block__p}`}>Окончание</p>
                                <DatePicker
                                    className={`${styles.input} ${styles.firstSections__div__main__block__input}`}
                                    selected={endDate2}
                                    onChange={(date) => setEndDate2(date!)}
                                    selectsEnd
                                    dateFormat="dd.MM.yyyy"
                                    startDate={startDate2}
                                    endDate={endDate2}
                                    minDate={startDate2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.section} ${styles.cleaningTZ}`}>
                    <div className={`${styles.section__block}`}>
                        <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>ТЗ на уборку:</p>
                        <button className={`${styles.section__block__button} ${styles.textRegular}`}><img src={plusImg} alt="plus" />Заполнить</button>
                    </div>
                </div>
                <div className={`${styles.section}`}>
                    <div className={`${styles.section__block} ${styles.city}`}>
                        <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Город и регион:</p>
                        <div className={`${styles.services__block}`}>
                            {
                                (isCitiesAutoComplete || !createTenderState.city) ? <>
                                    <input
                                        onFocus={() => { createTenderState.removeError('city'); setIsCitiesAutoComplete(true) }}
                                        onBlur={() => { createTenderState.addError('city'); setIsCitiesAutoComplete(false) }}
                                        value={createTenderState.city}
                                        onChange={(e) => { createTenderState.handleSimpleInput('city', e.currentTarget.value); createTenderState.getCities(e.currentTarget.value) }}
                                        type="text"
                                        className={`${styles.input} ${styles.cities__input} ${createTenderState.errors.includes('city') ? styles.inputError : ''}`} />
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
                        {/* <input type="text" className={`${styles.input} ${styles.city__input}`} /> */}
                        {/* <Autocomplete
                            classNames={itemClasses}
                            className={`${styles.section__block__cities} ${styles.AutoCompleteUI}`}
                            onInputChange={(newQuery) => createTenderState.getCities(newQuery)}
                            onBlur={() => { }}
                        // className={`${styles.input} ${styles.city__input}`}
                        >
                            {createTenderState.cities.map((city) => (
                                <AutocompleteItem className={`${styles.AutoCompleteItemUI}`} key={city.id} value={city.name}>
                                    {`${city.name} - ${city.region}`}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete> */}
                    </div>
                </div>
                <div className={`${styles.section} ${styles.object}`}>
                    <div className={`${styles.section__block}`}>
                        <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Объект:</p>
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
                        </div>
                    </div>
                    {
                        isChoosingObject && <div className={`${styles.object__objects} ${choosingObjectTypes ? '' : styles.object__objectsEmpty}`}>
                            <div className={styles.object__objects__objects}>
                                {
                                    objectsStore.apiObjects.map((object: { id: number, name: string, total: number, types: { id: number, name: string }[] }) => <p className={`${styles.object__objects__objects__p} ${object.name === isObjectChoosed ? styles.object__objects__objects__pSelected : ''}`} onClick={() => { setChoosingObjectTypes(object.types.map(el => ({ id: el.id, name: el.name, count: 0 }))); setIsObjectChoosed(object.name); setChooseTypesTypesToObjectToAddObject([]) }} key={object.id}>{object.name} {object.name === isObjectChoosed && <img src={arrowRightImg} alt="" />}</p>)
                                }
                            </div>
                            <div className={`${styles.object__objects__types} ${choosingObjectTypes ? '' : styles.object__objects__typesEmpty}`}>
                                {
                                    isObjectChoosed && (<>
                                        <CheckboxGroup
                                            //  onChange={(e) => setObjectTypeChosen(e.currentTarget.value)} label=""
                                            label=""
                                            defaultValue={[]}
                                            className={styles.object__services__types__checkboxGroup}
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
                                                createTenderState.addObject(isObjectChoosed!, chooseTypesTypesToObjectToAddObject)
                                                setIsChoosingObject(false)
                                                // setObjectTypeChosen(null)
                                            }
                                        }} className={styles.object__objects__types__button} disabled={!chooseTypesTypesToObjectToAddObject.length}>Применить</button>
                                    </>)
                                }
                            </div>
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
                </div>

                <div className={`${styles.section} ${styles.services}`}>
                    <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Услуги:</p>
                    <div className={`${styles.services__block}`}>
                        {createTenderState.services.length > 0 && <div className={styles.services__block__services}>
                            {
                                createTenderState.services.map(service =>
                                    <div className={styles.services__block__serviceToChange}>
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

                                        {isChoosingServiceToChange === service.id && <div className={`${styles.object__objects} ${styles.service__objects}`}>
                                            <div className={styles.object__objects__objects}>
                                                {
                                                    cleaningTypeStore.apiCleaningTypes.map((service) => <p onClick={() => { setChooseTypesNameToObjectToChangeService(service.name); setChooseTypesTypesToObjectToChangeService([]) }} className={`${styles.object__objects__objects__p} ${service.name === chooseTypesNameToObjectToChangeService ? styles.object__objects__objects__pSelected : ''}`} key={service.id}>{service.name} {service.name === chooseTypesNameToObjectToChangeService && <img src={arrowRightImg} alt="" />}</p>)
                                                }
                                            </div>
                                            <div className={`${styles.object__objects__types} ${styles.services__object__types} ${chooseTypesNameToObjectToChangeService ? '' : styles.object__objects__typesEmpty}`}>
                                                {
                                                    chooseTypesNameToObjectToChangeService && (<>
                                                        <CheckboxGroup
                                                            label=""
                                                            defaultValue={chooseTypesTypesToObjectToChangeService}
                                                            className={styles.object__services__types__checkboxGroup}
                                                            value={chooseTypesTypesToObjectToChangeService}
                                                            onValueChange={setChooseTypesTypesToObjectToChangeService}
                                                        >
                                                            {
                                                                cleaningTypeStore.apiCleaningTypes.find(service => service.name === chooseTypesNameToObjectToChangeService)?.types.map(type => <Checkbox className={`${styles.object__objects__types__p} ${styles.CheckboxNextUI} ${chooseTypesTypesToObjectToChangeService.includes(type.name) ? `${styles.CheckboxNextUIActive} ${styles.CheckboxNextUIActiveTypes}` : ''}`} key={type.id} value={type.name}>{type.name}</Checkbox>)
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
                        {
                            isChoosingServiceToAdd && <div className={`${styles.object__objects} ${styles.service__objects}`}>
                                <div className={styles.object__objects__objects}>
                                    {
                                        cleaningTypeStore.apiCleaningTypes.map((service) => <p onClick={() => { setChooseTypesNameToObjectToAddService(service.name); setChooseTypesTypesToObjectToAddService([]) }} className={`${styles.object__objects__objects__p} ${service.name === chooseTypesNameToObjectToAddService ? styles.object__objects__objects__pSelected : ''}`} key={service.id}>{service.name} {service.name === chooseTypesNameToObjectToAddService && <img src={arrowRightImg} alt="" />}</p>)
                                    }
                                </div>
                                <div className={`${styles.object__objects__types} ${styles.services__object__types} ${chooseTypesNameToObjectToAddService ? '' : styles.object__objects__typesEmpty}`}>
                                    {
                                        chooseTypesNameToObjectToAddService && (<>
                                            <CheckboxGroup
                                                label=""
                                                defaultValue={[]}
                                                className={styles.object__services__types__checkboxGroup}
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

                                </div>
                            </div>
                        }
                    </div>
                </div>

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
                        {createTenderState.errors.includes('description') && <p className={styles.inputErrorText}>Обязательно для заполнения</p>}
                    </div>
                </div>
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
                        {createTenderState.errors.includes('wishes') && <p className={styles.inputErrorText}>Обязательно для заполнения</p>}
                    </div>
                </div>
                <div className={`${styles.section} ${styles.attachments}`}>
                    <div className={`${styles.section__block}`}>
                        <p className={`${styles.section__block__p} ${styles.textReguar} ${styles.textBlack50}`}>Вложения:</p>
                        <div className={`${styles.section__attachments__block}`}>
                            {!!images.length &&
                                <div className={`${styles.section__attachments__block__cardList}`}>
                                    {
                                        images.map((img, ind) => {
                                            console.log(img);

                                            return <div key={img.id} className={`${styles.section__attachments__block__cardItem}`}>
                                                {
                                                    img.data.slice(5, 10) === 'image' ?
                                                        <img className={`${styles.section__attachments__block__cardItem__img}`} src={ind < images.length ? img.data : plusImg} alt="" /> :
                                                        <div className={`${styles.section__attachments__block__cardItem__img} ${styles.section__attachments__block__cardItem__notImage}`}>
                                                            <img className={styles.section__attachments__block__cardItem__notImageInfo__img} src={fileImg} alt="" />
                                                            <div className={styles.section__attachments__block__cardItem__notImageInfo}>
                                                                <p>{img.data.slice(5, 13) === 'text/xml' ? 'XML' : 'PDF'}</p>
                                                                <img src={downloadImg} alt="" onClick={() => handleDownload(img.data, `image_${img.id}`)} />
                                                            </div>
                                                        </div>
                                                }
                                                {
                                                    img.isChanging ?
                                                        <textarea
                                                            cols={2} value={img.text}
                                                            onChange={(e) => changeAttachmentText(img.id, e.currentTarget.value)}
                                                            className={`${styles.input}`}></textarea> :
                                                        <p className={`${styles.section__attachments__block__cardItem__text}`}>{img.text}</p>
                                                }
                                                <div className={`${styles.section__attachments__block__cardItem__changes}`}>
                                                    <img className={`${styles.section__attachments__block__cardItem__changes__img}`}
                                                        src={img.isChanging ? checkMarkImg : changeAttachmentImg} alt=""
                                                        onClick={() => changeAttachmentIsChanging(img.id)} />
                                                    <span className={`${styles.section__attachments__block__cardItem__changes__span}`}></span>
                                                    <img onClick={() => removeAttachment(img.id)} className={`${styles.section__attachments__block__cardItem__changes__img}`} src={removeAttachmentImg} alt="" />
                                                    <p onClick={() => removeAttachment(img.id)} className={`${styles.section__attachments__block__cardItem__changes__text}`}>Удалить</p>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            }
                            <button onClick={() => { images.length < 8 && handleButtonFileClick() }} disabled={images.length >= 8} className={`${styles.section__block__button} ${styles.textRegular} ${styles.section__attachments__block__button} ${createTenderState.errors.includes('attachments') ? styles.section__block__buttonError : ''}`}><img src={plusImg} alt="plus" />Добавить вложения (до 8 шт.)</button>
                            <input
                                type="file"
                                multiple
                                accept="image/*,.pdf,.xml"
                                onChange={handleFileUpload}
                                ref={inputFileRef}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${styles.section} ${styles.sendButtons}`}>
                    <div className={`${styles.section__block}`}>
                        <p className={`${styles.section__block__p}`}></p>
                        <div className={`${styles.section__sendButtons__block}`}>
                            <button onClick={() => createTenderState.validateInputs()} className={styles.section__sendButtons__block__moderationButton}>Отправить на модерацию</button>
                            <button className={styles.section__sendButtons__block__templateButton}>Сохранить как черновик</button>
                        </div>
                    </div>
                </div>
            </>)
            }
        </div >
    )
}