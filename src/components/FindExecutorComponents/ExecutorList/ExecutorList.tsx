import { FC, useEffect, useState } from 'react';
import styles from './executor-list.module.css'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter';
import { Hits, InstantSearch } from 'react-instantsearch';

const ExecutorList: FC = () => {
    const [searchClient, setSearchClient] = useState(null);

    useEffect(() => {
        const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
            server: {
                apiKey: 'R5PQLVrGuPubEcLIdGIJhjip5kvdXbFu',
                nodes: [
                    {
                        host: 'search.ubrato.ru',
                        port: 443,
                        protocol: 'https',
                        path: "",
                        // tls:true
                    }
                ]
            },
            additionalSearchParameters: {
                query_by: "name",
                // sort_by: 'price:asc',
            },
        });
        // const searchClient = typesenseInstantsearchAdapter.searchClient
        setSearchClient(typesenseInstantsearchAdapter.searchClient)
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, setValue] = useState([
        {
            img: '/banner-image.png',
            name: 'OOO name',
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium incidunt voluptatibus dolor eveniet vero! Pariatur laboriosam illum repudiandae nisi maxime, iure consequuntur itaque blanditiis beatae doloribus eaque, inventore aperiam fugit vero libero nesciunt porro fugiat unde quod laudantium id amet. Eos aliquid aliquam cumque maiores fugiat numquam, odit accusamus dolorum!',
            regions: ['moscow', 'oblast'],
            services: [
                {
                    name: 'nameService1',
                    price: 12
                },
                {
                    name: 'nameService2',
                    price: 34
                },
                {
                    name: 'nameService1',
                    price: 12
                },
                {
                    name: 'nameService2',
                    price: 34
                },
                {
                    name: 'nameService1',
                    price: 12
                },
                {
                    name: 'nameService2',
                    price: 34
                },
            ],
            areServicesHidden: true,
            isfavorite: false
        },
        {
            img: '/banner-image.png',
            name: 'ooo name',
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium incidunt voluptatibus dolor eveniet vero! Pariatur laboriosam illum repudiandae nisi maxime, iure consequuntur itaque blanditiis beatae doloribus eaque, inventore aperiam fugit vero libero nesciunt porro fugiat unde quod laudantium id amet. Eos aliquid aliquam cumque maiores fugiat numquam, odit accusamus dolorum!',
            regions: ['moscow', 'oblast'],
            services: [
                {
                    name: 'nameService1',
                    price: 12
                },
                {
                    name: 'nameService2',
                    price: 34
                },
                {
                    name: 'nameService1',
                    price: 12
                },
                {
                    name: 'nameService2',
                    price: 34
                },
                {
                    name: 'nameService1',
                    price: 12
                },
                {
                    name: 'nameService2',
                    price: 34
                },
            ],
            areServicesHidden: false,
            isfavorite: true
        },
    ]);

    const classNames = {
        trigger: styles.trigger,
        base: styles.base,
        list: styles.list,
    }

    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.amount}>
                <p className={styles.number}>Исполнители: {value.length}</p>
                <Dropdown
                    classNames={classNames}
                >
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Рекомендуем <img src="/find-executor/drop-down.svg" alt="" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="new">New fguvfhjvdfjbvdfbjvkjbile</DropdownItem>
                        <DropdownItem key="copy">Copy link</DropdownItem>
                        <DropdownItem key="edit">Edit file</DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger">
                            Delete file
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            {/* {
                searchClient &&
                <div>
                    <InstantSearch indexName={'contractor_index'} searchClient={searchClient}>
                        <Hits hitComponent={({ hit }) => (
                            <p>
                                {hit.name}
                            </p>
                        )} />
                    </InstantSearch>
                </div>
            } */}
            <div className={styles.executors}>
                {
                    value.map((executor, ind) => <div key={ind} className={styles.executor}>
                        <div className={styles.executorInfo}>
                            <img className={styles.executorImage} src={executor.img} alt="executor image" />
                            <div className={styles.executorTextBlock}>
                                <p className={styles.executorName}>{executor.name}</p>
                                <p className={styles.executorText}>{executor.text}</p>
                                <div className={styles.executorRegions}>
                                    {
                                        executor.regions.map((region, ind) => <p key={ind} className={styles.executorRegion}>{region}</p>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.services}>
                            {
                                executor.services.slice(0, executor.areServicesHidden ? 4 : undefined).map((service, ind) =>
                                    <div key={ind} className={styles.service}>
                                        <p className={styles.serviceName}>{service.name}</p>
                                        <p className={styles.servicePrice}>от {service.price} ₽ за ед.
                                            <img src="/find-executor/arrow-right-blue.svg" alt="arrow right blue" />
                                        </p>
                                    </div>
                                )
                            }
                            {
                                executor.areServicesHidden && <div className={styles.service}>
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