import { executorList } from "@/types/app";
import { Dispatch, FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from './executor-item.module.css'

const ExecutorItem: FC<{
    executor: executorList,
    showAllExecutorServices?: (id: string) => void,
    showAllExecutorText: (id: string) => void
    favoriteExecutorsHandler: (executor: executorList) => void,
    setExecutorIdToOfferTender: Dispatch<React.SetStateAction<string | null>>,
    setExecutorNameToOfferTender: Dispatch<React.SetStateAction<string | null>>,
    additionalStyles?: CSSModuleClasses,
    servicesNumber?: number
}> = ({ executor, showAllExecutorServices, showAllExecutorText, favoriteExecutorsHandler, setExecutorIdToOfferTender, setExecutorNameToOfferTender, additionalStyles, servicesNumber }) => {
    const navigate = useNavigate();

    const getShorterText = (text: string) => {
        return text.split(' ').slice(0, 10).join(' ')
    }

    return (
        <div key={executor.id} className={`${styles.executor} ${additionalStyles ? additionalStyles.executorForCarousel : ''}`}>
            <div className={styles.executorInfo}>
                <img className={styles.executorImage} src={executor.img} alt="" />
                <div className={styles.executorTextBlock}>
                    <p className={styles.executorName}>{executor.name}</p>
                    {executor.text &&
                        <p className={styles.executorText}>
                            {executor.isTextHidden ? getShorterText(executor.text) : executor.text}
                            {executor.isTextHidden && <img onClick={() => showAllExecutorText(executor.id)} src="/find-executor/arrow-right-black.svg" alt="->" />}
                        </p>}
                    <div className={styles.executorRegions}>
                        {executor.regions.map((region) => (
                            <p key={region.id} className={styles.executorRegion}>
                                {region.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            {!!executor.services.length &&
                <div className={`${styles.services} ${additionalStyles ? additionalStyles.servicesForCarousel : ''}`}>
                    {executor.services
                        .slice(0, servicesNumber ? servicesNumber : (executor.areServicesHidden ? 4 : undefined))
                        .map((service) => (
                            <div key={service.id} className={`${styles.service} ${additionalStyles ? additionalStyles.serviceForCarousel : ''}`}>
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
                    {executor.areServicesHidden && showAllExecutorServices && (
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
            }
            <div className={`${styles.executorButtons} ${additionalStyles ? additionalStyles.executorButtonsForCarousel : ''}`}>
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
                    className={`${styles.executorOfferButton} ${additionalStyles ? additionalStyles.executorOfferButtonCarousel : ''}`}
                >
                    Предложить тендер
                    <img
                        src={additionalStyles ? "/find-executor/arrow-right-black.svg" : "/find-executor/arrow-right-white.svg"}
                        alt="arrow right white"
                    />
                </button>
            </div>
        </div>
    );
}

export default ExecutorItem;