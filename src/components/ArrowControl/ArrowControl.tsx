import { CSSProperties, FC, MouseEventHandler } from 'react';
import styles from './arrowcontrol.module.css';

type PropsT = {
  onClick?: MouseEventHandler;
  style?: CSSProperties;
  image: string;
};

export const ArrowControl: FC<PropsT> = ({ onClick, style, image }) => {
  return (
    <div className={styles.container} onClick={onClick} style={style}>
      <img className={styles.image} src={image} alt="" />
    </div>
  );
};
