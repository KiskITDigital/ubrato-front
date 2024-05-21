import { FC, ReactNode, useEffect, useState } from 'react';
import styles from './main-filter.module.css'
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import { generateSearchClient } from '../generateSearchclient';

const MainFilter: FC = () => {
    const [isSearchClient, setIsSearchClient] = useState(false);
    useEffect(() => {
        setIsSearchClient(true)

    }, []);
    const [chosenLocation, setChosenLocation] = useState('');

    const [objectId, setObjectId] = useState<null | number>(null);
    const [objectTypesId, setobjectTypesId] = useState<number[]>([]);

    const [servicesId, setServicesId] = useState<number[]>([]);
    const [servicesTypesId, setServicesTypesId] = useState<number[]>([]);

    const reset = () => {
        setChosenLocation('')
        setObjectId(null)
        setobjectTypesId([])
        setServicesId([])
        setServicesTypesId([])
    }

    const objectImages = {
        'HoReCa': 'horeca',
        'Транспортная инфраструктура': 'road',
        'Транспорт': 'transport',
        'Торговая недвижимость': 'trading',
        'Территория': 'territory',
        'Спортивно-оздоровительные объекты': 'stadium',
        'Складская недвижимость': 'stock',
        'Производственная недвижимость': 'factory',
        'Природные объекты': 'nature',
        'Офисная недвижимость': 'office',
        'Объекты образования': 'school',
        'Объекты культурного наследия': 'museum',
        'Объект здравоохранения': 'pharmacy',
        'Жилая недвижимость': 'living-building',
    }

    return (
        <div className={`container ${styles.container}`}>
            <p className={styles.mainTitle}>Фильтры</p>
            {
                isSearchClient &&
                <div className={styles.block}>
                    <InstantSearch indexName={'city_index'} searchClient={generateSearchClient()}>
                        <p className={styles.title}>Локации:</p>
                        {
                            chosenLocation ?
                                <>
                                    <div className={styles.chosenLocations}>
                                        <p
                                            className={styles.chosenLocation}
                                        >
                                            {chosenLocation}
                                            <img onClick={() => setChosenLocation('')} className={styles.removeChosenLocation} src="/create-tender/create-tender-close.svg" alt="delete icon" />
                                        </p>
                                    </div>
                                </>
                                :
                                <>
                                    <label className={styles.inputFilterLabel}>
                                        <img className={styles.inputFilterLabelImg} src="/find-executor/loupe.svg" alt="loupe" />
                                        <SearchBox
                                            className={styles.inputFilter}
                                            placeholder="Населенный пункт" />
                                    </label>
                                    <Hits
                                        classNames={{
                                            list: styles.hitList,
                                            item: styles.location
                                        }}
                                        hitComponent={({ hit }) => (
                                            <p
                                                onClick={() => setChosenLocation(hit.name as string)}>
                                                {hit.name as ReactNode}
                                            </p>
                                        )} />
                                </>
                        }

                    </InstantSearch>
                </div>
            }
            {
                isSearchClient &&
                <div className={styles.block}>
                    <InstantSearch indexName='object_group_index' searchClient={generateSearchClient(250)}>
                        <p className={styles.title}>Объекты:</p>
                        <label className={styles.inputFilterLabel}>
                            <img className={styles.inputFilterLabelImg} src="/find-executor/loupe.svg" alt="loupe" />
                            <SearchBox
                                className={styles.inputFilter}
                                placeholder="Поиск" />
                        </label>
                        <Hits
                            classNames={{
                                list: styles.hitList,
                            }}
                            hitComponent={({ hit }) => (
                                <>
                                    <p
                                        className={styles.objectItem}
                                        onClick={() => { setObjectId(hit.id === objectId ? null : hit.id as number); setobjectTypesId([]) }}>
                                        <img className={styles.objectItemImage} src={`/find-executor/${objectImages[hit.name]}.svg`} alt='object image' />
                                        {hit.name as ReactNode}
                                    </p>
                                    {
                                        hit.id == objectId &&
                                        <InstantSearch indexName='object_type_index' searchClient={generateSearchClient(250)}>
                                            <Hits
                                                classNames={{
                                                    list: styles.objectTypeList,
                                                }} hitComponent={(props) => {
                                                    const { hit: hitType } = props
                                                    return (
                                                        hitType.group_id === hit.id &&
                                                        <p
                                                            className={styles.objectTypeItem}
                                                            onClick={() => setobjectTypesId(prev => prev.includes(+hitType.id) ? [...prev.filter(el => el !== +hitType.id)] : [...prev, +hitType.id])}
                                                        // onClick={(e) => { console.log(objectTypesId, hitType.id, e); setobjectTypesId([+hitType.id]) }}
                                                        >
                                                            {
                                                                objectTypesId.includes(+hitType.id) ?
                                                                    <img src="/find-executor/checkmark.svg" alt="check-mark" />
                                                                    :
                                                                    <span></span>
                                                            }
                                                            {hitType.name as ReactNode}
                                                        </p>
                                                    )
                                                }} />
                                        </InstantSearch>
                                    }
                                </>

                            )} />
                    </InstantSearch>
                </div>
            }
            {
                isSearchClient &&
                <div className={styles.block}>
                    <InstantSearch indexName='service_group_index' searchClient={generateSearchClient(250)}>
                        <p className={styles.title}>Услуги:</p>
                        <label className={styles.inputFilterLabel}>
                            <img className={styles.inputFilterLabelImg} src="/find-executor/loupe.svg" alt="loupe" />
                            <SearchBox
                                className={styles.inputFilter}
                                placeholder="Поиск" />
                        </label>
                        <Hits
                            classNames={{
                                list: styles.hitList,
                            }}
                            hitComponent={({ hit }) => (
                                <>
                                    <p
                                        className={styles.objectItem}
                                        onClick={() => { setServicesId(prev => prev.includes(+hit.id) ? [...prev.filter(el => el !== +hit.id)] : [...prev, +hit.id]) }}>
                                        <img className={styles.objectItemImage} src='/find-executor/service.svg' alt='serivce image' />
                                        {hit.name as ReactNode}
                                    </p>
                                    {
                                        servicesId.includes(+hit.id) &&
                                        <InstantSearch indexName='service_type_index' searchClient={generateSearchClient(250)}>
                                            <Hits
                                                classNames={{
                                                    list: styles.objectTypeList,
                                                }} hitComponent={(props) => {
                                                    const { hit: hitType } = props
                                                    return (
                                                        hitType.group_id === hit.id &&
                                                        <p
                                                            className={styles.objectTypeItem}
                                                            onClick={() => setServicesTypesId(prev => prev.includes(+hitType.id) ? [...prev.filter(el => el !== +hitType.id)] : [...prev, +hitType.id])}
                                                        // onClick={(e) => { console.log(objectTypesId, hitType.id, e); setobjectTypesId([+hitType.id]) }}
                                                        >
                                                            {
                                                                servicesTypesId.includes(+hitType.id) ?
                                                                    <img src="/find-executor/checkmark.svg" alt="check-mark" />
                                                                    :
                                                                    <span></span>
                                                            }
                                                            {hitType.name as ReactNode}
                                                        </p>
                                                    )
                                                }} />
                                        </InstantSearch>
                                    }
                                </>

                            )} />
                    </InstantSearch>
                </div>
            }
            <div className={styles.block}>
                <button
                    className={styles.makeFilters}
                // onClick={search}
                >Применить фильтры</button>
                <button
                    onClick={reset}
                    className={styles.resetFilters}
                >Сбросить</button>
            </div>
        </div>
    );
}

export default MainFilter;