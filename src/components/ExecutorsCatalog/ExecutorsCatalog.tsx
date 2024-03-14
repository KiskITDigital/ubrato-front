import { FC, useEffect, useState, useRef } from 'react';
import styles from './executorscatalog.module.css';
import { TypeObjectCard } from '../TypeObjectCard/TypeObjectCard';
import { useTypesObjectsStore } from '../../store/objectsStore';
import { useCleaningTypeStore } from '../../store/cleaningTypeStore';
import { TypeCleaningCard } from '../TypeCleaningCard/TypeCleaningCard';
import { Link } from 'react-router-dom';
import { countTransform } from '../../utils/cuntTransform';

export const ExecutorsCatalog: FC = () => {
  const objectsStore = useTypesObjectsStore();
  const typeCleaningStore = useCleaningTypeStore();

  const listRef = useRef<HTMLDivElement>(null);
  const [isShown, setIsShown] = useState(false);
  const [showBtnText, setShowBtnText] = useState('Показать все объекты');

  useEffect(() => {
    const height = Math.ceil((objectsStore.objects.length - 8) / 4) * 105;
    if (isShown) {
      setShowBtnText('Скрыть доп. объекты');
      listRef.current!.style.height = `${listRef.current!.offsetHeight + height}px`;
      console.log(listRef.current?.offsetHeight);
    } else {
      listRef.current!.style.height = `${listRef.current!.offsetHeight - height}px`;
      setShowBtnText('Показать все объекты');
      console.log(listRef.current?.offsetHeight);
    }
  }, [isShown, objectsStore.objects.length]);

  const count = 200;

  return (
    <div className={`container ${styles.container}`}>
      <div className={`${styles.dasshedBorder} ${styles.container}`}>
        <h2 className={styles.header}>
          <span className={styles.blueText}>Каталог</span> исполнителей
        </h2>
        <p className={styles.text}>
          Выбирайте исполнителей из каталога Ubrato в зависимости от объекта, которым вы управляете,
          или от необходимой вам услуги клининга
        </p>
        <div>
          <p className={styles.whereToClean}>Укажите, где нужен клининг</p>
          <div ref={listRef} className={styles.objectsGrid}>
            {objectsStore.objects.map((e, ix) => (
              <TypeObjectCard key={ix} info={e} changeActive={objectsStore.handleActive} ix={ix} />
            ))}
          </div>
          <div className={styles.btnContainer}>
            <button onClick={() => setIsShown(!isShown)} className={styles.btn}>
              <img
                src="./arrow-down.svg"
                alt="arrow"
                style={{ transform: isShown ? 'rotate(180deg)' : '' }}
              />
              <p>{showBtnText}</p>
            </button>
            <p className={styles.countText}>{objectsStore.objects.length - 8} типов</p>
          </div>
        </div>
      </div>
      <div className={`${styles.dasshedBorder} ${styles.cleaningType}`}>
        <p className={styles.cleanType}>Укажите вид клининга</p>
        <div className={styles.cleaningTypeGrid}>
          {typeCleaningStore.types.map((e, ix) => (
            <TypeCleaningCard
              key={ix}
              info={e}
              changeActive={typeCleaningStore.handleActive}
              ix={ix}
            />
          ))}
          <div>
            <Link to="/tenders" className={styles.allTenderLink}>
              <p className={styles.allTenderHeader}>Все тендеры</p>
              <p className={styles.allTenderCount}>
                {count} {countTransform(count)}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
