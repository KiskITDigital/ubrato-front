import { Dispatch, FC } from "react";
import styles from './executor-list.module.css'
import { executorList } from "@/types/app";
import { useNavigate } from "react-router-dom";

const ExecutorList: FC<{
    executorList: executorList[],
    setExecutorList: Dispatch<React.SetStateAction<executorList[]>>,
    setExecutorNameToOfferTender: Dispatch<React.SetStateAction<string | null>>,
    setExecutorIdToOfferTender: Dispatch<React.SetStateAction<string | null>>,
    favoriteExecutorsHandler: (executor: executorList) => void
}> = ({ executorList, setExecutorList, setExecutorIdToOfferTender, setExecutorNameToOfferTender, favoriteExecutorsHandler }) => {
    const navigate = useNavigate();

    const showAllExecutorServices = (id: string) => {
        setExecutorList((prev) =>
            prev.map((executor) =>
                executor.id === id
                    ? { ...executor, areServicesHidden: false }
                    : executor
            )
        );
    };

    return (
        <div className={styles.executors}>
            {executorList.map((executor: executorList) => (
                <div key={executor.id} className={styles.executor}>
                    <div className={styles.executorInfo}>
                        <img className={styles.executorImage} src={executor.img} alt="" />
                        <div className={styles.executorTextBlock}>
                            <p className={styles.executorName}>{executor.name}</p>
                            <p className={styles.executorText}>{executor.text}</p>
                            <div className={styles.executorRegions}>
                                {executor.regions.map((region) => (
                                    <p key={region.id} className={styles.executorRegion}>
                                        {region.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.services}>
                        {executor.services
                            .slice(0, executor.areServicesHidden ? 4 : undefined)
                            .map((service) => (
                                <div key={service.id} className={styles.service}>
                                    <p className={styles.serviceName}>{service.name}</p>
                                    <p className={styles.servicePrice}>
                                        от {service.price} ₽ за ед.
                                        <img
                                            src="/find-executor/arrow-right-blue.svg"
                                            alt="arrow right blue"
                                        />
                                    </p>
                                </div>
                            ))}
                        {executor.areServicesHidden && (
                            <div
                                onClick={() => showAllExecutorServices(executor.id)}
                                className={styles.service}
                            >
                                <p className={styles.serviceName}>
                                    Все услуги
                                    <img
                                        src="/find-executor/arrow-right-black.svg"
                                        alt="arrow right blue"
                                    />
                                </p>
                            </div>
                        )}
                    </div>
                    <div className={styles.executorButtons}>
                        <button
                            onClick={() => favoriteExecutorsHandler(executor)}
                            className={styles.executorLoveButton}
                        >
                            <img
                                src={`/find-executor/heart-${executor.isFavorite ? "active" : "inactive"
                                    }.svg`}
                                alt="heart"
                            />
                        </button>
                        <button
                            onClick={() => {
                                const token = localStorage.getItem("token");
                                if (!token) {
                                    navigate("/login");
                                } else {
                                    document.body.style.overflow = "hidden";
                                    setExecutorIdToOfferTender(executor.id);
                                    setExecutorNameToOfferTender(executor.name);
                                }
                            }}
                            className={styles.executorOfferButton}
                        >
                            Предложить тендер
                            <img
                                src="/find-executor/arrow-right-white.svg"
                                alt="arrow right white"
                            />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ExecutorList;