import FastFilter from "@/components/FindExecutorComponents/FastFilter/FastFilter";
import styles from './FindExecutor.module.css'
import { FC } from "react";
import MainFilter from "@/components/FindExecutorComponents/MainFilter/MainFilter";
import ExecutorList from "@/components/FindExecutorComponents/ExecutorList/ExecutorList";
import { QuestionsBlock, Seo } from "@/components";

const FindExecutor: FC = () => {
    return (
        <section>
            <FastFilter />
            <div className={`container ${styles.mainBlock}`}>
                <MainFilter />
                <ExecutorList />
            </div>
            <QuestionsBlock />
            <Seo />
        </section>
    );
}

export default FindExecutor;