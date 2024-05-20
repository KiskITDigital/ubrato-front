import { FC } from 'react';
import style from './OneTenderOffers.module.css';

type TenderOffers = {
  offers: Array<string>;
};

export const OneTenderOffers: FC<TenderOffers> = ({ offers }) => {
  return (
    <div className={style.block_main}>
      <p className={style.block_main_p}>Услуги:</p>{' '}
      <div className={style.lineList}>
        {' '}
        <div className={style.iconLine}>
          <div className={style.IconBack}>
            <img
              className={style.icon}
              src="/tenderpics/cleaning_bucket_FILL0_wght400_GRAD0_opsz24 1.svg"
              alt=""
            />
          </div>{' '}
          <p>
            Уборка <span>{'>'}</span>{' '}
          </p>
        </div>{' '}
        {offers.map((obj, index) => (
          <p className={style.block_add_p} key={index}>
            {obj}
          </p>
        ))}
      </div>
    </div>
  );
};
