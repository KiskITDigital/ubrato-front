import FastFilter from "@/components/FindExecutorComponents/FastFilter/FastFilter";
import styles from './FindExecutor.module.css'
import { FC } from "react";
import MainFilter from "@/components/FindExecutorComponents/MainFilter/MainFilter";
import Executors from "@/components/FindExecutorComponents/Executors/Executors";
import { QuestionsBlock, Seo } from "@/components";
import { useFindExecutorState } from "@/store/findExecutorStore";

const FindExecutor: FC = () => {
    const findExecutorState = useFindExecutorState()
    return (
        <section>
            <FastFilter title="исполнителя" values={findExecutorState.fastFilterTexts} setValues={findExecutorState.handleFastFilterTexts} />
            <div className={`container ${styles.mainBlock}`}>
                <MainFilter />
                <Executors />
            </div>
            <QuestionsBlock />
            <Seo />
        </section>
    );
}

export default FindExecutor;