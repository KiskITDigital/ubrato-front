import { FC, useEffect, useState } from 'react';
import styles from './executor-list.module.css'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import Typesense from 'typesense'
import { getExecutor } from '@/api/getExecutor';
import { executorList } from '@/types/app';
import { useFindExecutorState } from '@/store/findExecutorStore';

const ExecutorList: FC = () => {
    const findExecutorState = useFindExecutorState()
    const [executorList, setExecutorList] = useState<executorList[]>([])

    const showAllExecutorServices = (id: number) => {
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
        const searchParameters = {
            'q': '',
            'query_by': 'inn',
        };

        client.collections('contractor_index').documents().search(searchParameters)
            .then(async (response) => {
                // console.log(response.hits);
                const newExecutorList = [] as executorList[];
                await Promise.all((response.hits || []).map(async (res) => {
                    const { id } = res.document as { id: number };
                    if (!id) return;
                    const data = await getExecutor(id);
                    const newExecutorData = {
                        id: data.organizationInfo.id,
                        img: data.organizationInfo.avatar ? `${data.organizationInfo.avatar?.replace('/files', '')}` : '/avatar-ic.svg',
                        name: data.organizationInfo.short_name,
                        text: data.contractorInfo.description,
                        regions: data.contractorInfo.locations,
                        services: data.contractorInfo.services,
                        areServicesHidden: data.contractorInfo.services.length > 5
                    };
                    console.log(newExecutorData);
                    if (
                        (findExecutorState.locationId ? newExecutorData.regions.some((region: { id: number, name: string }) => region.id === +findExecutorState.locationId!) : true) &&
                        (findExecutorState.servicesTypesId.length ? newExecutorData.services.some((service: { id: number, name: string, price: number }) => findExecutorState.servicesTypesId.includes(service.id)) : true)
                    ) newExecutorList.push(newExecutorData);
                }));
                setExecutorList(newExecutorList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [findExecutorState.locationId, findExecutorState.servicesTypesId, findExecutorState.servicesTypesId.length]);

    const classNames = {
        trigger: styles.trigger,
        base: styles.base,
        list: styles.list,
    }

    return (
        <div className={`container ${styles.container}`}>
            {findExecutorState.locationId}
            <div className={styles.amount}>
                <p className={styles.number}>Исполнители: {executorList.length}</p>
                <Dropdown
                    classNames={classNames}
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
                            <img className={styles.executorImage} src={executor.img} alt="executor image" />
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
                            <button className={styles.executorLoveButton}>
                                <img src="/find-executor/heart-inactive.svg" alt="heart" />
                            </button>
                            <button className={styles.executorOfferButton}>
                                Предложить тендер
                                <img src="/find-executor/arrow-right-white.svg" alt="arrow right white" />
                            </button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}

export default ExecutorList;
