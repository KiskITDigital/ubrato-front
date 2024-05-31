import { FC, useEffect, useState } from 'react';
import styles from './executor-list.module.css'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Pagination } from "@nextui-org/react";
import Typesense from 'typesense'
import { getExecutor, isFavoriteExecutor, addFavoriteExecutor, removeFavoriteExecutor } from '@/api/index'
import { executorList } from '@/types/app';
import { useFindExecutorState } from '@/store/findExecutorStore';
import OfferTender from '../OfferTender/OfferTender';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/Modal';

const ExecutorList: FC = () => {
    const findExecutorState = useFindExecutorState()
    const [executorList, setExecutorList] = useState<executorList[]>([])
    const [allExecutorListLength, setAllExecutorListLength] = useState(0);
    const [paginationTotal, setPaginationTotal] = useState(0);
    const [paginationPage, setPaginationPage] = useState(1);
    const [paginationPerPage, setPaginationPerPage] = useState(2);
    const navigate = useNavigate();
    const [sortingValue, setSortingValue] = useState<'' | 'name:asc' | 'name:desc'>('');
    const [executorIdToOfferTender, setExecutorIdToOfferTender] = useState<null | string>(null);
    const [executorNameToOfferTender, setExecutorNameToOfferTender] = useState<null | string>(null);

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
            apiKey: 'Ii388RgSrBidU2XYjSDNElyzDfrZyMnM',
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

        const filters = (() => {
            const filters = []
            if (findExecutorState.locationId) filters.push(`$contractor_city(city_id:=${findExecutorState.locationId})`)
            if (findExecutorState.objectTypesId.length) findExecutorState.objectTypesId.forEach(object => filters.push(`$contractor_object(object_type_id:=${object})`))
            if (findExecutorState.servicesTypesId.length) findExecutorState.servicesTypesId.forEach(service => filters.push(`$contractor_service(service_type_id:=${service})`))
            if (findExecutorState.fastFilterTexts) findExecutorState.fastFilterTexts.forEach(filter => filters.push(`(inn:=*${filter}* || name:=*${filter}* || name:=*${filter.toLocaleLowerCase()}* || name:=*${filter.toLocaleUpperCase()}*)`))
            return filters.join(' && ')
        })()

        const searchParameters = {
            'q': '',
            'query_by': 'name',
            'per_page': paginationPerPage,
            'page': paginationPage,
            'filter_by': filters,
            'sort_by': sortingValue
        };

        const getAllExecutorListLengthSearchParameters = {
            'q': '',
            'query_by': 'name',
            'filter_by': filters,
        }

        client.collections('contractor_index').documents().search(getAllExecutorListLengthSearchParameters)
            .then(async response => {
                setAllExecutorListLength(response?.hits?.length || 0)
                setPaginationTotal((response?.hits?.length ? Math.ceil(response.hits.length / paginationPerPage) : 0))
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        client.collections('contractor_index').documents().search(searchParameters)
            .then(async (response) => {
                const newExecutorList = [] as executorList[];
                const token = localStorage.getItem('token');

                const promises = (response.hits || []).map((res, index) => {
                    const { id } = res.document as { id: string };
                    if (!id) return null;

                    return (async () => {
                        const data = await getExecutor(id);
                        const isFavorite = !!token && (await isFavoriteExecutor(id, token))?.data?.status || false;

                        return {
                            index,
                            executorData: {
                                id: data.organizationInfo.id,
                                img: data.organizationInfo.avatar ? `${data.organizationInfo.avatar?.replace('/files', '')}` : '/avatar-ic.svg',
                                name: data.organizationInfo.short_name,
                                inn: data.organizationInfo.inn,
                                text: data.contractorInfo.description,
                                regions: data.contractorInfo.locations,
                                services: data.contractorInfo.services,
                                areServicesHidden: data.contractorInfo.services.length > 5,
                                isFavorite: isFavorite
                            }
                        } as { index: number, executorData: executorList };
                    })();
                }).filter(promise => promise !== null);

                const results = await Promise.all(promises);

                results.sort((a, b) => a!.index - b!.index).forEach(result => {
                    newExecutorList.push(result!.executorData);
                });

                setExecutorList(newExecutorList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [
        findExecutorState.objectTypesId,
        paginationPage,
        paginationPerPage,
        sortingValue,
        findExecutorState.locationId,
        findExecutorState.servicesTypesId,
        findExecutorState.servicesTypesId.length,
        findExecutorState.fastFilterTexts,
        findExecutorState.fastFilterTexts.length
    ]);

    return (
        <div className={`container ${styles.container}`}>
            {
                !!executorIdToOfferTender && !!executorNameToOfferTender && <Modal isOpen={!!executorIdToOfferTender}>
                    <OfferTender closeModal={setExecutorIdToOfferTender} executorId={executorIdToOfferTender} executorName={executorNameToOfferTender} />
                </Modal>
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
                        <DropdownItem onClick={() => setSortingValue('name:asc')}>По наименованию</DropdownItem>
                        <DropdownItem onClick={() => setSortingValue('name:desc')}>По популярности</DropdownItem>
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
                                    if (!token) {
                                        navigate('/login')
                                    } else {
                                        const res = await executor.isFavorite ? removeFavoriteExecutor(executor.id, token) : addFavoriteExecutor(executor.id, token)
                                        const resStatus = (await res).data.status
                                        setExecutorList(prev => prev.map(executorItem => executorItem.id === executor.id ? ({ ...executorItem, isFavorite: resStatus ? !executorItem.isFavorite : executorItem.isFavorite }) : executorItem))
                                    }
                                }}
                                className={styles.executorLoveButton}
                            >
                                <img src={`/find-executor/heart-${executor.isFavorite ? 'active' : 'inactive'}.svg`} alt="heart" />
                            </button>
                            <button
                                onClick={() => {
                                    const token = localStorage.getItem('token')
                                    if (!token) {
                                        navigate('/login')
                                    } else {
                                        document.body.style.overflow = "hidden";
                                        setExecutorIdToOfferTender(executor.id)
                                        setExecutorNameToOfferTender(executor.name)
                                    }
                                }}
                                className={styles.executorOfferButton}>
                                Предложить тендер
                                <img src="/find-executor/arrow-right-white.svg" alt="arrow right white" />
                            </button>
                        </div>
                    </div>)
                }
            </div>
            {
                allExecutorListLength > executorList.length &&
                <>
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
                </>
            }
        </div>
    );
}

export default ExecutorList;