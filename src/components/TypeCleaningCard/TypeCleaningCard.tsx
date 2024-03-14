import { FC } from 'react';
import { CleaningTypeT } from '../../types/app';
import styles from './typecleaningcard.module.css';
import { countTransform } from '../../utils/cuntTransform';

type PropsT = {
  info: CleaningTypeT;
  changeActive: (ix: number) => void;
  ix: number;
};

export const TypeCleaningCard: FC<PropsT> = ({ info, changeActive, ix }) => {
  return (
    <div
      className={`${styles.container} ${info.isActive ? styles.active : ''}`}
      onClick={() => {
        changeActive(ix);
      }}
      style={{ backgroundImage: `url(${info.image})`, paddingBottom: `${info.padding}px` }}
    >
      <div className={styles.textContent}>
        <p className={styles.header}>{info.name}</p>
        <p>
          {info.count} {countTransform(info.count)}
        </p>
      </div>
    </div>
  );
};
