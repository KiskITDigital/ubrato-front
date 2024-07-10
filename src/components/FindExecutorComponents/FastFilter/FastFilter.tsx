import { FC, Fragment, useEffect, useState } from "react";
import styles from './fast-filter.module.css'
import { useLocation, useNavigate } from "react-router-dom";

const FastFilterBlock: FC<{ title: string, values: string[], setValues: (newFastFilterTexts: string[]) => void }> = ({ title, values, setValues }) => {
    const [inputFilter, setInputFilter] = useState('');
    // const preDefinedValues: string[] = ['Уборка офиса', 'Уборка ТЦ', 'Уборка склада', 'Уборка территории', 'Зимняя уборка']

    const location = useLocation()
    const navigate = useNavigate()

    const [breadCrumbs, setBreadCrumbs] = useState<{ name: string, onClick?: () => void }[]>([{ name: 'главная', onClick: () => { navigate('/') } }]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        if (values.find((el) => el === inputFilter) || inputFilter.length === 0) {
            return
        }
        else {
            setValues([...values, inputFilter])
            setInputFilter('')
        }
    };

    // const filterByPreDefinedValues = (filter: string) => {
    //     if (values.find((el) => el === filter)) {
    //         return
    //     }
    //     else {
    //         setValues([...values, filter])
    //     }
    // }

    useEffect(() => {
        setBreadCrumbs(prev => [prev[0], prev[1], ...values.map(filter => ({ name: filter }))])
        console.log(values)
    }, [values.length, values]);

    useEffect(() => {
        if (location.pathname === '/find-executor') setBreadCrumbs(prev => prev.map((crumb: { name: string, onClick?: () => void }, ind: number) => ind === 1 ? { name: 'найти исполнителя', onClick: () => { setValues([]) } } : crumb))
        if (location.pathname === '/alltenders') setBreadCrumbs(prev => prev.map((crumb: { name: string, onClick?: () => void }, ind: number) => ind === 1 ? { name: 'найти тендер', onClick: () => { setValues([]) } } : crumb))
        else navigate('/find-executor')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <div className={`container ${styles.container}`}>
            <h1 className={styles.title}><span>Поиск</span> {title}</h1>
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


            {/* <div className={styles.preDefinedFilters}>
                {preDefinedValues.map((filter, ind) => <div key={ind} className={values.find((el) => el === filter) ? styles.preDefinedFilter : 'disabledPreDefinedFilter'}>
                    <p onClick={() => filterByPreDefinedValues(filter)} className={styles.filterName}>{filter}</p>
                </div>)}
            </div> */}

            {!!values.length && <div className={styles.filters}>
                <>
                    {values.map((filter, ind) => <div key={ind} className={styles.filter}>
                        <p className={styles.filterName}>{filter}</p>
                        <img onClick={() => setValues(values.filter(el => el !== filter))} className={styles.removeFilter} src="/create-tender/create-tender-close.svg" alt="delete icon" />
                    </div>)}
                    <button onClick={() => setValues([])} className={styles.removeAllFilters}>Сброcить все</button>
                </>

            </div>}
            {breadCrumbs.length > 1 &&
                <div className={styles.breadCrumbs}>
                    {breadCrumbs.map((crumb: { name: string, onClick?: () => void }, ind: number, breadCrumbsArr: { name: string, onClick?: () => void }[]) => (<Fragment key={ind}>
                        <p className={`${styles.breadCrumb} ${crumb?.onClick ? '' : styles.breadCrumbInActive}`} onClick={() => crumb?.onClick && crumb.onClick()}>{crumb?.name}</p>
                        {ind < breadCrumbsArr.length - 1 &&
                            <img className={`${styles.breadCrumbImg} ${crumb.onClick ? '' : styles.breadCrumbImgInActive}`} src="/find-executor/arrow-right-black.svg" alt="->" />}
                    </Fragment>))}
                </div>}
        </div>
    );
}

export default FastFilterBlock;