import { FC, useState, useRef, useEffect } from 'react';
import styles from './executorscatalog.module.css';
import { TypeObjectCard, TypeCleaningCard } from '@/components';
import { useTypesObjectsStore } from '@/store/objectsStore';
import { useCleaningTypeStore } from '@/store/cleaningTypeStore';
import { Link } from 'react-router-dom';
import { countTransformTender, countTransformService } from '@/utils';
import { useIsOrdererState } from '@/store/isOrdererStore';

export const ExecutorsCatalog: FC = () => {
  const objectsStore = useTypesObjectsStore();
  const typeCleaningStore = useCleaningTypeStore();
  const isOrdererState = useIsOrdererState();

  const listRef = useRef<HTMLDivElement>(null);
  const [isShown, setIsShown] = useState(false);
  const [showBtnText, setShowBtnText] = useState('Показать все объекты');

  useEffect(() => {
    const height = Math.ceil((objectsStore.objects.length - 8) / 4) * 105;
    if (isShown) {
      setShowBtnText('Скрыть доп. объекты');
      listRef.current!.style.height = `${listRef.current!.offsetHeight + height}px`;
    } else {
      listRef.current!.style.height = `${listRef.current!.offsetHeight - height}px`;
      setShowBtnText('Показать все объекты');
    }
  }, [isShown, objectsStore.objects.length]);

  const fetchObjects = objectsStore.fetchObjects;
  const fetchCleaningTypes = typeCleaningStore.fetchCleaningTypes;

  useEffect(() => {
    (async () => {
      if (objectsStore?.apiObjects?.length === 0) {
        await fetchObjects();
      }
      if (typeCleaningStore?.apiCleaningTypes?.length === 0) {
        await fetchCleaningTypes();
      }
    })();
  }, [
    fetchCleaningTypes,
    fetchObjects,
    objectsStore?.apiObjects?.length,
    typeCleaningStore?.apiCleaningTypes?.length,
  ]);

  const count = 200;

  const width: number | null = null;
  const widthR = useRef<number | null>(width);

  useEffect(() => {
    if (window.outerWidth <= 450) {
      widthR.current = window.outerHeight;
    }
  }, []);

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
        <div className={styles.mobileBorder}>
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
                style={{ transform: isShown ? 'rotate(180deg)' : 'none' }}
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
          {widthR.current && (
            <div>
              <Link to="/alltenders" className={styles.allTenderLink}>
                <p className={styles.allTenderHeader}>Все тендеры</p>
                <p className={styles.allTenderCount}>
                  {count}{' '}
                  {isOrdererState.role === 'contractor'
                    ? countTransformTender(count)
                    : countTransformService(count)}
                </p>
              </Link>
            </div>
          )}
          {typeCleaningStore.types.map((e, ix) => (
            <TypeCleaningCard
              key={ix}
              info={e}
              changeActive={typeCleaningStore.handleActive}
              ix={ix}
            />
          ))}
          {!widthR.current && (
            <div>
              <Link to="/tenders" className={styles.allTenderLink}>
                <p className={styles.allTenderHeader}>Все тендеры</p>
                <p className={styles.allTenderCount}>
                  {count}{' '}
                  {isOrdererState.role === 'contractor'
                    ? countTransformTender(count)
                    : countTransformService(count)}
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.findExecutor}>
        <p className={styles.executorsCount}>Найдено исполнителей: 2 485</p>
        <button className={styles.findExecutorBtn}>
          Найти исполнителя
          {widthR.current ? <p className={styles.countExecutorsText}> 2485</p> : ''}
          <img className={styles.arrow} src="./arrow-with-line-right-white.svg" alt="arrow" />
        </button>
      </div>
    </div>
  );
};
