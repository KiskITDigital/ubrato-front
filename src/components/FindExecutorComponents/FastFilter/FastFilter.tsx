import { FC, useState } from "react";
import styles from './fast-filter.module.css'

const FastFilterBlock: FC = () => {
    const [inputFilter, setInputFilter] = useState('');
    const [filters, setFilters] = useState<string[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        setFilters([...filters, inputFilter])
        setInputFilter('')
    };

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
                    placeholder="Например, наименование или ИНН компании, услуга, регион" />
            </label>
            {!!filters.length && <div className={styles.filters}>
                {
                    <>
                        {filters.map((filter, ind) => <div key={ind} className={styles.filter}>
                            <p className={styles.filterName}>{filter}</p>
                            <img onClick={() => setFilters(prev => prev.filter(el => el !== filter))} className={styles.removeFilter} src="/create-tender/create-tender-close.svg" alt="delete icon" />
                        </div>)}
                        <button onClick={() => setFilters([])} className={styles.removeAllFilters}>Сброcить все</button>
                    </>
                }
            </div>}
        </div>
    );
}

export default FastFilterBlock;