import Modal from '@/components/Modal';
import OfferTender from '@/components/FindExecutorComponents/OfferTender/OfferTender';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExecutorItem from '@/components/FindExecutorComponents/ExecutorItem';
import itemStyles from './tender-advice-item.module.css'
import {
    addFavoriteExecutor,
    fetchContractorProfile,
    removeFavoriteExecutor,
    updateToken,
} from "@/api/index";
import { executorList } from '@/types/app';
import { generateTypesenseClient, getExecutorList } from '@/components/FindExecutorComponents/generateSearchclient';
import { useFindExecutorState } from '@/store/findExecutorStore';
import styles from './tenders-advice-executors.module.css'
import { useUserInfoStore } from '@/store/userInfoStore';

const TendersAdviceExecutors: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
    const navigate = useNavigate();

    const findExecutorState = useFindExecutorState();

    const userInfoState = useUserInfoStore()

    const [executorList, setExecutorList] = useState<executorList[][]>([]);

    const [executorIdToOfferTender, setExecutorIdToOfferTender] = useState<
        null | string
    >(null);
    const [executorNameToOfferTender, setExecutorNameToOfferTender] = useState<
        null | string
    >(null);

    const favoriteExecutorsHandler = async (executor: executorList) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            const res = executor.isFavorite
                ? removeFavoriteExecutor(executor.id, token)
                : addFavoriteExecutor(executor.id, token);
            const resStatus = (await res).data.status;
            findExecutorState.handleExecutorList(findExecutorState.executorList.map((executorItem) =>
                executorItem.id === executor.id
                    ? {
                        ...executorItem,
                        isFavorite: resStatus
                            ? !executorItem.isFavorite
                            : executorItem.isFavorite,
                    }
                    : executorItem
            ));
        }
    }

    const updateExecutorList = async (newExecutorList: executorList[]) => {
        // console.log(newExecutorList);

        newExecutorList = newExecutorList.map(executor => ({ ...executor, text: executor.text ? executor.text.length > 103 ? executor.text.slice(0, 100) + "..." : executor.text : "", isTextHidden: false }))
        if (localStorage.getItem("token") && userInfoState.is_contractor) {
            const res = await updateToken(fetchContractorProfile, null);
            console.log(res.locations);
        }


        const changedNewExecutorList: executorList[][] = []
        for (let i = 0; i < newExecutorList.length; i += (isMobile ? 1 : 4)) {
            const chunk = newExecutorList.slice(i, i + (isMobile ? 1 : 4));
            changedNewExecutorList.push(chunk);
        }

        setExecutorList(changedNewExecutorList)
    }

    // const showAllExecutorText = (id: string) => {
    //     const newExecutorList = findExecutorState.executorList.map((executor) =>
    //         executor.id === id
    //             ? { ...executor, isTextHidden: false }
    //             : executor
    //     )
    //     updateExecutorList(newExecutorList);
    // }

    useEffect(() => {
        (async () => {
            const hits = await generateTypesenseClient("contractor_index")
            const newExecutorList = await getExecutorList(hits)
            findExecutorState.handleExecutorList(newExecutorList)
        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateExecutorList(findExecutorState.executorList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [findExecutorState.executorList]);

    return (
        <div className={styles.embla__container}>
            {!!executorIdToOfferTender && !!executorNameToOfferTender && (
                <Modal isOpen={!!executorIdToOfferTender}>
                    <OfferTender
                        closeModal={setExecutorIdToOfferTender}
                        executorId={executorIdToOfferTender}
                        executorName={executorNameToOfferTender}
                    />
                </Modal>
            )}
            {
                executorList.map((executorBlock: executorList[], ind: number) => (
                    <div key={ind} className={styles.embla__slide}>
                        {
                            executorBlock.map((executor: executorList) => (
                                <div key={executor.id}>
                                    <ExecutorItem
                                        executor={executor}
                                        additionalStyles={itemStyles}
                                        favoriteExecutorsHandler={favoriteExecutorsHandler}
                                        setExecutorIdToOfferTender={setExecutorIdToOfferTender}
                                        setExecutorNameToOfferTender={setExecutorNameToOfferTender}
                                        servicesNumber={3}
                                    // showAllExecutorText={showAllExecutorText}
                                    />
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default TendersAdviceExecutors;