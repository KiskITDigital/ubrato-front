import { FC } from 'react';
import { ObjectInfoT } from '../../types/app';
import styles from './typeobjectcard.module.css';

type PropsT = {
  info: ObjectInfoT,
  changeActive: (ix:number) => void,
  ix:number
}

export const TypeObjectCard: FC<PropsT> = ({ changeActive, info, ix }) => {
  return (
    <div onClick={() => changeActive(ix)} className={`${styles.container} ${info.isActive ? styles.active : ''}`}>
      <img src={info.image} alt="" />
      <div>
        <p>{info.name}</p>
        <p>{info.count}</p>
      </div>
    </div>
  );
};
