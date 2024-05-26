import { FC, useEffect, useState } from 'react';
import styles from './executor-list.module.css'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Pagination } from "@nextui-org/react";
import Typesense from 'typesense'
import { getExecutor, isFavoriteExecutor, addFavoriteExecutor, removeFavoriteExecutor } from '@/api/index'
import { executorList } from '@/types/app';
import { useFindExecutorState } from '@/store/findExecutorStore';
import OfferTender from '../OfferTender/OfferTender';
// import { Hits, InstantSearch, SortBy } from 'react-instantsearch';
// import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter';

const ExecutorList: FC = () => {
    const findExecutorState = useFindExecutorState()
    const [executorList, setExecutorList] = useState<executorList[]>([])
    const [allExecutorListLength, setAllExecutorListLength] = useState(0);
    const [paginationTotal, setPaginationTotal] = useState(0);
    const [paginationPage, setPaginationPage] = useState(1);
    const [paginationPerPage, setPaginationPerPage] = useState(2);

    const [executorIdToOfferTender, setExecutorIdToOfferTender] = useState<null | string>(null);

    const dropDownClassNames = {
        trigger: styles.trigger,
        base: styles.base,
        list: styles.list,
    }

    const paginationClassNames = {
        base: styles.paginationBase,
        wrapper: styles.wrapper,
        cursor: styles.cursor,
        prev: styles.prev,
        item: styles.item,
        next: styles.next,
    }

    const showAllExecutorServices = (id: string) => {
        setExecutorList(prev => prev.map(executor => executor.id === id ? { ...executor, areServicesHidden: false } : executor))
    }

    useEffect(() => {
        const client = new Typesense.Client({
            apiKey: 'R5PQLVrGuPubEcLIdGIJhjip5kvdXbFu',
            'nodes': [
                {
                    host: 'search.ubrato.ru',
                    port: 443,
                    protocol: 'https',
                    path: "",
                    // tls:true
                }
            ],
        });

        // console.log(findExecutorState.locationId, findExecutorState.fastFilterTexts, findExecutorState.objectTypesId, findExecutorState.servicesTypesId);
        const filters = (() => {
            const filters = []
            if (findExecutorState.locationId) filters.push(`$contractor_city(city_id:=${findExecutorState.locationId})`)
            if (findExecutorState.objectTypesId.length) findExecutorState.objectTypesId.forEach(object => filters.push(`$contractor_object(object_type_id:=${object})`))
            if (findExecutorState.servicesTypesId.length) findExecutorState.servicesTypesId.forEach(service => filters.push(`$contractor_service(service_type_id:=${service})`))
            if (findExecutorState.fastFilterTexts) findExecutorState.fastFilterTexts.forEach(filter => filters.push(`(inn:=*${filter}* || name:=*${filter}* || name:=*${filter.toLocaleLowerCase()}* || name:=*${filter.toLocaleUpperCase()}*)`))
            return filters.join(' && ')
        })()
        // console.log(filters);
        const searchParameters = {
            'q': '',
            'query_by': 'name',
            'per_page': paginationPerPage,
            'page': paginationPage,
            'filter_by': filters,
            // 'filter_by': '$contractor_object(object_type_id:=1) && $contractor_object(object_type_id:=2)'
            // 'filter_by': '$contractor_city(city_id:=190)',
            // 'filter_by': 'inn:=*7721546*',
        };

        const getAllExecutorListLengthSearchParameters = {
            'q': '',
            'query_by': 'name',
            'filter_by': filters,
        }

        client.collections('contractor_index').documents().search(getAllExecutorListLengthSearchParameters)
            .then(response => {
                setAllExecutorListLength(response?.hits?.length || 0)
                setPaginationTotal((response?.hits?.length ? Math.ceil(response.hits.length / paginationPerPage) : 0))
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        client.collections('contractor_index').documents().search(searchParameters)
            .then(async (response) => {
                const newExecutorList = [] as executorList[];
                console.log(response.hits);
                const token = localStorage.getItem('token')
                await Promise.all((response.hits || []).map(async (res) => {
                    const { id } = res.document as { id: string };
                    if (!id) return;
                    const data = await getExecutor(id);
                    const isFavorite = !!token && (await isFavoriteExecutor(id, token))?.data?.status || false
                    // console.log(isFavorite);
                    // console.log(data);
                    const newExecutorData = {
                        id: data.organizationInfo.id,
                        img: data.organizationInfo.avatar ? `${data.organizationInfo.avatar?.replace('/files', '')}` : '/avatar-ic.svg',
                        name: data.organizationInfo.short_name,
                        inn: data.organizationInfo.inn,
                        text: data.contractorInfo.description,
                        regions: data.contractorInfo.locations,
                        services: data.contractorInfo.services,
                        areServicesHidden: data.contractorInfo.services.length > 5,
                        isFavorite: isFavorite
                    } as executorList;
                    newExecutorList.push(newExecutorData);
                }));
                setExecutorList(newExecutorList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [
        findExecutorState.objectTypesId,
        paginationPage,
        paginationPerPage,
        findExecutorState.locationId,
        findExecutorState.servicesTypesId,
        findExecutorState.servicesTypesId.length,
        findExecutorState.fastFilterTexts,
        findExecutorState.fastFilterTexts.length
    ]);


    // const [searchClient, setSearchClient] = useState(null);

    // useEffect(() => {
    //     const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
    //         server: {
    //             apiKey: 'R5PQLVrGuPubEcLIdGIJhjip5kvdXbFu',
    //             'nodes': [
    //                 {
    //                     host: 'search.ubrato.ru',
    //                     port: 443,
    //                     protocol: 'https',
    //                     path: "",
    //                     // tls:true
    //                 }
    //             ],
    //         },
    //         additionalSearchParameters: {
    //             query_by: "name",
    //         },
    //     });
    //     setSearchClient(typesenseInstantsearchAdapter.searchClient)
    // }, [])

    return (
        <div className={`container ${styles.container}`}>
            {/* {
                searchClient &&
                <InstantSearch indexName='contractor_index' searchClient={searchClient}>
                    <SortBy items={[
                        { label: "wrk", value: 'contractor_index' },
                        { label: "asc", value: 'contractor_index/sort/name:asc' },
                        { label: "desc", value: 'contractor_index/sort/name:desc' }
                    ]}></SortBy>
                    <Hits />
                </InstantSearch>
            } */}
            {
                !!executorIdToOfferTender &&
                <OfferTender closeModal={setExecutorIdToOfferTender} executorId={executorIdToOfferTender} />
            }
            <div className={styles.amount}>
                <p className={styles.number}>Исполнители: {allExecutorListLength}</p>
                <Dropdown
                    classNames={dropDownClassNames}
                >
                    <DropdownTrigger>
                        <Button
                            disableRipple
                            variant="bordered"
                        >
                            Рекомендуем <img src="/find-executor/drop-down.svg" alt="" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem >По наименованию</DropdownItem>
                        <DropdownItem >По популярности</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className={styles.executors}>
                {
                    executorList.map((executor) => <div key={executor.id} className={styles.executor}>
                        <div className={styles.executorInfo}>
                            <img className={styles.executorImage} src={executor.img} alt="" />
                            <div className={styles.executorTextBlock}>
                                <p className={styles.executorName}>{executor.name}</p>
                                <p className={styles.executorText}>{executor.text}</p>
                                <div className={styles.executorRegions}>
                                    {
                                        executor.regions.map((region) => <p key={region.id} className={styles.executorRegion}>{region.name}</p>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.services}>
                            {
                                executor.services.slice(0, executor.areServicesHidden ? 4 : undefined).map((service) =>
                                    <div key={service.id} className={styles.service}>
                                        <p className={styles.serviceName}>{service.name}</p>
                                        <p className={styles.servicePrice}>от {service.price} ₽ за ед.
                                            <img src="/find-executor/arrow-right-blue.svg" alt="arrow right blue" />
                                        </p>
                                    </div>
                                )
                            }
                            {
                                executor.areServicesHidden && <div
                                    onClick={() => showAllExecutorServices(executor.id)}
                                    className={styles.service}>
                                    <p className={styles.serviceName}>Все услуги
                                        <img src="/find-executor/arrow-right-black.svg" alt="arrow right blue" />
                                    </p>
                                </div>
                            }
                        </div>
                        <div className={styles.executorButtons}>
                            <button
                                onClick={async () => {
                                    const token = localStorage.getItem('token')
                                    if (!token) return;
                                    const res = await executor.isFavorite ? removeFavoriteExecutor(executor.id, token) : addFavoriteExecutor(executor.id, token)
                                    const resStatus = (await res).data.status
                                    setExecutorList(prev => prev.map(executorItem => executorItem.id === executor.id ? ({ ...executorItem, isFavorite: resStatus ? !executorItem.isFavorite : executorItem.isFavorite }) : executorItem))
                                }}
                                className={styles.executorLoveButton}
                            >
                                <img src={`/find-executor/heart-${executor.isFavorite ? 'active' : 'inactive'}.svg`} alt="heart" />
                            </button>
                            <button
                                onClick={() => {
                                    document.body.style.overflow = "hidden";
                                    setExecutorIdToOfferTender(executor.id)
                                }}
                                className={styles.executorOfferButton}>
                                Предложить тендер
                                <img src="/find-executor/arrow-right-white.svg" alt="arrow right white" />
                            </button>
                        </div>
                    </div>)
                }
            </div>
            <button
                onClick={() => setPaginationPerPage(prev => prev + 2)}
                className={styles.showMore}>
                Показать еще
                <img src="/find-executor/arrow-down.svg" alt="" />
            </button>
            {
                !!paginationTotal &&
                <Pagination classNames={paginationClassNames} total={paginationTotal} showControls initialPage={1} page={paginationPage} onChange={setPaginationPage} />
            }
        </div>
    );
}

export default ExecutorList;