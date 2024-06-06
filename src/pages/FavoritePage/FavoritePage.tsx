import Switcher from "@/components/Favorite/Switcher/Switcher";
import { FC, useEffect, useRef, useState } from "react";
import styles from './favorite-page.module.css'
import { getAllFavoriteExecutors, removeFavoriteExecutor } from "@/api";
import { generateTypesenseClient, getExecutorList } from "@/components/FindExecutorComponents/generateSearchclient";
import { executorList } from "@/types/app";
import ExecutorList from "@/components/FindExecutorComponents/ExecutorList/ExecutorList";
import OfferTender from "@/components/FindExecutorComponents/OfferTender/OfferTender";
import Modal from "@/components/Modal";
import { useNavigate } from "react-router-dom";
import { FavouriteTendersList } from "@/components/FavouriteTenders/FavouriteTendersList/FavouriteTendersList";

const FavoritePage: FC = () => {
    const startRef = useRef<HTMLHeadingElement>(null)

    const navigate = useNavigate();

    const [switcher, setSwitcher] = useState<'Тендеры' | 'Исполнители'>('Тендеры');
    const [executorList, setExecutorList] = useState<executorList[]>([]);

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
            const res = executor.isFavorite && await removeFavoriteExecutor(executor.id, token) || { data: { status: false } }
            const resStatus = res.data.status;
            if (resStatus) setExecutorList(prev => prev.filter(el => el.id !== executor.id))
        }
    }

    useEffect(() => {
        startRef.current!.scrollIntoView({ behavior: "smooth" })
        setTimeout(() => {
            const elementTop = startRef.current!.getBoundingClientRect().top;
            window.scrollBy({ top: elementTop - 200, behavior: "smooth" });
        }, 0);

        (async () => {
            const token = localStorage.getItem('token')
            if (!token) return;
            const favoriteExecutors = (await getAllFavoriteExecutors(token)).data
            const filters = `id:=[${favoriteExecutors.map((executor: { id: string }) => executor.id)}]`
            const hits = await generateTypesenseClient("contractor_index", { filter_by: filters })
            const newExecutorList = await getExecutorList(hits)
            setExecutorList(newExecutorList)
        })()
    }, []);

    return (
        <section ref={startRef} className={styles.container}>
            {!!executorIdToOfferTender && !!executorNameToOfferTender && (
                <Modal isOpen={!!executorIdToOfferTender}>
                    <OfferTender
                        closeModal={setExecutorIdToOfferTender}
                        executorId={executorIdToOfferTender}
                        executorName={executorNameToOfferTender}
                    />
                </Modal>
            )}
            <p className={styles.title}>Избранное</p>
            <Switcher state={switcher} setState={setSwitcher} />
            {
                switcher === 'Тендеры' ?
                    <FavouriteTendersList/> :
                    executorList.length ?
                        <ExecutorList
                            executorList={executorList}
                            setExecutorList={setExecutorList}
                            setExecutorIdToOfferTender={setExecutorIdToOfferTender}
                            setExecutorNameToOfferTender={setExecutorNameToOfferTender}
                            favoriteExecutorsHandler={favoriteExecutorsHandler}
                        /> :
                        <p className={styles.empty}>У вас пока нет избранных исполнителей</p>
            }
        </section>
    );
}

export default FavoritePage;