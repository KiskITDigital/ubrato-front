import { FC } from 'react';
import styles from './executorscatalog.module.css';
import { TypeObjectCard } from '../TypeObjectCard/TypeObjectCard';
import { useTypesObjectsStore } from '../../store/store';

export const ExecutorsCatalog: FC = () => {
  const objectsStore = useTypesObjectsStore();

  // const handleActive = (ix:number) => {
  //   const curObjects = objects
  //   curObjects[ix].isActive = !curObjects[ix].isActive;
  //   curObjects[ix].name = 'hui'
  //   console.log(curObjects)
  //   setObjects(curObjects)
  //   console.log(objects)
  // }

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
        <div className={styles.objectsGrid}>
          {objectsStore.objects.map((e, ix) => (
            <TypeObjectCard key={ix} info={e} changeActive={objectsStore.handleActive} ix={ix} />
          ))}
        </div>
      </div>
    </div>
  );
};
