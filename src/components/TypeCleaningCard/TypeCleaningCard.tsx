import { FC, useEffect, useRef } from 'react';
import { CleaningTypeT } from '../../types/app';
import styles from './typecleaningcard.module.css';
import { countTransform } from '../../utils/cuntTransform';

type PropsT = {
  info: CleaningTypeT;
  changeActive: (ix: number) => void;
  ix: number;
};

export const TypeCleaningCard: FC<PropsT> = ({ info, changeActive, ix }) => {
  const width: number | null = null;
  const widthR = useRef<number | null>(width);

  useEffect(() => {
    if (window.outerWidth <= 450) {
      widthR.current = window.outerHeight;
    }
  }, []);

  return (
    <div
      className={`${styles.container} ${info.isActive ? styles.active : ''}`}
      onClick={() => {
        changeActive(ix);
      }}
      style={
        widthR.current
          ? {}
          : { backgroundImage: `url(${info.image})`, paddingBottom: `${info.padding}px` }
      }
    >
      <div className={styles.textContent}>
        <p className={styles.header}>{info.name}</p>
        <p className={styles.text}>
          {info.count === -1 ? '' : `${info.count} ${countTransform(info.count)}`}
        </p>
      </div>
    </div>
  );
};
