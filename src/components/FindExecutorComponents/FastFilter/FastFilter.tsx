import { FC, Fragment, useEffect, useState } from "react";
import styles from './fast-filter.module.css'
import { useFindExecutorState } from "@/store/findExecutorStore";
import { useLocation, useNavigate } from "react-router-dom";

const FastFilterBlock: FC = () => {
    const findExecutorState = useFindExecutorState()
    const [inputFilter, setInputFilter] = useState('');

    const location = useLocation()
    const navigate = useNavigate()

    const [breadCrumbs, setBreadCrumbs] = useState<{ name: string, onClick?: () => void }[]>([{ name: 'главная', onClick: () => { navigate('/') } }]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        findExecutorState.handleFastFilterTexts([...findExecutorState.fastFilterTexts, inputFilter])
        setInputFilter('')
    };

    useEffect(() => {
        setBreadCrumbs(prev => [prev[0], prev[1], ...findExecutorState.fastFilterTexts.map(filter => ({ name: filter }))])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [findExecutorState.fastFilterTexts.length]);

    useEffect(() => {
        if (location.pathname === '/find-executor') setBreadCrumbs(prev => prev.map((crumb: { name: string, onClick?: () => void }, ind: number) => ind === 1 ? { name: 'найти исполнителя', onClick: () => { findExecutorState.handleFastFilterTexts([]) } } : crumb))
        // if (location.pathname === '/alltenders') setBreadCrumbs(prev => prev.map((crumb: string, ind: number) => ind === 1 ? 'найти тендер' : crumb))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <div className={`container ${styles.container}`}>
            <h1 className={styles.title}><span>Поиск</span> исполнителя</h1>
            <label className={styles.inputFilterLabel}>
                <img className={styles.inputFilterLabelImg} src="/find-executor/loupe.svg" alt="loupe" />
                <input
                    className={styles.inputFilter}
                    type="text"
                    value={inputFilter}
                    onChange={(e) => setInputFilter(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setInputFilter('')}
                    placeholder="Например, наименование или ИНН компании" />
            </label>
            {!!findExecutorState.fastFilterTexts.length && <div className={styles.filters}>
                {
                    <>
                        {findExecutorState.fastFilterTexts.map((filter, ind) => <div key={ind} className={styles.filter}>
                            <p className={styles.filterName}>{filter}</p>
                            <img onClick={() => findExecutorState.handleFastFilterTexts(findExecutorState.fastFilterTexts.filter(el => el !== filter))} className={styles.removeFilter} src="/create-tender/create-tender-close.svg" alt="delete icon" />
                        </div>)}
                        <button onClick={() => findExecutorState.handleFastFilterTexts([])} className={styles.removeAllFilters}>Сброcить все</button>
                    </>
                }
            </div>}
            {!!breadCrumbs.length &&
                <div className={styles.breadCrumbs}>
                    {breadCrumbs.map((crumb: { name: string, onClick?: () => void }, ind: number, breadCrumbsArr: { name: string, onClick?: () => void }[]) => (<Fragment key={ind}>
                        <p className={`${styles.breadCrumb} ${crumb.onClick ? '' : styles.breadCrumbInActive}`} onClick={() => crumb.onClick && crumb.onClick()}>{crumb.name}</p>
                        {ind < breadCrumbsArr.length - 1 &&
                            <img className={`${styles.breadCrumbImg} ${crumb.onClick ? '' : styles.breadCrumbImgInActive}`} src="/find-executor/arrow-right-black.svg" alt="->" />}
                    </Fragment>))}
                </div>}
        </div>
    );
}

export default FastFilterBlock;