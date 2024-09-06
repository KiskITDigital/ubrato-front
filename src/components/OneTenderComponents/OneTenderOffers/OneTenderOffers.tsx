import { FC } from 'react';
import style from './OneTenderOffers.module.css';

type TenderOffers = {
  servicesGroups: string[];
  servicesTypes: string[];
};

export const OneTenderOffers: FC<TenderOffers> = ({ servicesGroups, servicesTypes }) => {
  return (
    <div className={style.block_main}>
      <p className={style.block_main_p}>Услуги:</p>{' '}
      <div className={style.lineList}>
        {' '}
        <div className={style.iconLine}>
          <div className={style.IconBack}>
            <img
              className="min-w-10 h-6"
              src="/tenderpics/cleaning_bucket_FILL0_wght400_GRAD0_opsz24 1.svg"
              alt=""
            />
          </div>{' '}
          <div className="flex gap-2">
            <div className="flex">
              {servicesGroups.map((group, groupIndex) =>
                <>
                  <span>
                    {group}
                  </span>
                  <span className="last:hidden pr-1">,</span>
                </>
              )}
            </div>
            <p>
              {'>'}
            </p>
          </div>
        </div>
        {servicesTypes?.map((obj, index) => (
          <p className={style.block_add_p} key={index}>
            {obj}
          </p>
        ))}
      </div>
    </div>
  );
};
