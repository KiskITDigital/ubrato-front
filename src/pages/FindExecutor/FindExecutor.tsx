import FastFilter from "@/components/FindExecutorComponents/FastFilter/FastFilter";
import styles from './FindExecutor.module.css'
import { FC, useEffect } from "react";
import MainFilter from "@/components/FindExecutorComponents/MainFilter/MainFilter";
import Executors from "@/components/FindExecutorComponents/Executors/Executors";
import { QuestionsBlock, Seo } from "@/components";
import { useNavigate } from "react-router-dom";

const FindExecutor: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/register')
    }, [navigate]);
    
    return (
        <section>
            <FastFilter />
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