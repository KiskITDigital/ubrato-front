import { FC } from 'react';
import { ObjectInfoT } from '../../types/app';
import styles from './typeobjectcard.module.css';
import { countTransform } from '../../utils/cuntTransform';

type PropsT = {
  info: ObjectInfoT;
  changeActive: (ix: number) => void;
  ix: number;
};

export const TypeObjectCard: FC<PropsT> = ({ changeActive, info, ix }) => {

  return (
    <div
      onClick={() => changeActive(ix)}
      className={`${styles.container} ${info.isActive ? styles.active : ''}`}
    >
      <img className={styles.image} src={info.image} alt="" />
      <div className={styles.textContent}>
        <p className={styles.header}>{info.name}</p>
        <p className={styles.text}>
          {info.count === -1?'':`${info.count} ${countTransform(info.count)}`}
        </p>
      </div>
    </div>
  );
};
