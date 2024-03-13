import { FC, useEffect, useState, useRef } from 'react';
import styles from './executorscatalog.module.css';
import { TypeObjectCard } from '../TypeObjectCard/TypeObjectCard';
import { useTypesObjectsStore } from '../../store/objectsStore';

export const ExecutorsCatalog: FC = () => {
  const objectsStore = useTypesObjectsStore();

  const listRef = useRef<HTMLDivElement>(null);
  const [isShown, setIsShown] = useState(false);
  const [showBtnText, setShowBtnText] = useState('Показать все объекты');

  useEffect(() => {
    const height = Math.ceil((objectsStore.objects.length - 8) / 4) * 105;
    if (isShown) {
      setShowBtnText('Скрыть');
      listRef.current!.style.height = `${listRef.current!.offsetHeight + height}px`;
      console.log(listRef.current?.offsetHeight);
    } else {
      listRef.current!.style.height = `${listRef.current!.offsetHeight - height}px`;
      setShowBtnText('Показать все объекты');
      console.log(listRef.current?.offsetHeight);
    }
  }, [isShown, objectsStore.objects.length]);

  return (
    <div className={`container ${styles.container}`}>
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
          <button onClick={() => setIsShown(!isShown)}>{showBtnText}</button>
        </div>
      </div>
    </div>
  );
};
