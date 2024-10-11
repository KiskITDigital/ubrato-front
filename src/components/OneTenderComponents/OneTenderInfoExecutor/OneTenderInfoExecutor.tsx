import { FC } from 'react';
import styles from './OneTenderInfo.module.css';

type OneTenderInfo = {
  price: number;
  timestamp_rc_start: string;
  timestamp_rc_end: string;
  timestamp_wrk_start: string;
  timestamp_wrk_end: string;
  timestamp_crtd: string;
  is_nds: boolean;
  is_contract_price: boolean;
};

export const OneTenderInfoExecutor: FC<OneTenderInfo> = ({
  price,
  timestamp_rc_end,
  timestamp_rc_start,
  timestamp_wrk_end,
  timestamp_wrk_start,
  is_nds,
  is_contract_price,
}) => {
  const getDate = (date: string) => {
    const date2 = new Date(date);
    const res: string = date2.toLocaleDateString();
    return res;
  };

  const getHour = (date: string) => {
    const date2 = new Date(date);
    const res: string = date2.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return res;
  };

  // useEffect(()=>{
  //   console.log(timestamp_wrk_start);
  // },[timestamp_wrk_start])

  return (
    <div className={styles.infocontainer}>
      <div className={styles.offerings_block}>
        <div className={styles.one_part_grow}>
          <p className={styles.nd_info_accented}>Приём откликов</p>
          <div className={styles.date_info}>
            <p className={styles.info_start}>
              {getDate(timestamp_rc_start)},
              <span className='text-[14px] text-[rgba(0,0,0,.5)] ml-[5px]'>{getHour(timestamp_rc_start)}</span>
            </p>{' '}
            <p className={styles.info_end}>
              {getDate(timestamp_rc_end)},
              <span className='text-[14px] text-[rgba(0,0,0,.5)] ml-[5px]'>{getHour(timestamp_rc_end)}</span>
            </p>
          </div>
        </div>
        <div className={styles.one_part_grow}>
          <div>
            <p className={styles.nd_info_accented}>Стоимость</p>
            {!is_contract_price ? (
              <div className={styles.nds_field}>
                <p>{price} ₽</p>{' '}
                {is_nds ? (
                  <p className={styles.nds_block}>включая ндс</p>
                ) : (
                  <p className={`${styles.nds_block} ${styles.silenced}`}>без ндс</p>
                )}
              </div>
            ) : (
              <div className={styles.nds_field}>
                <p>Договорная</p>{' '}
                {is_nds ? (
                  <p className={styles.nds_block}>включая ндс</p>
                ) : (
                  <p className={`${styles.nds_block} ${styles.silenced}`}>без ндс</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.one_part_grow}>
          <p className={styles.nd_info}>Оказание услуг</p>
          <div className={styles.date_info}>
            <p className={styles.info_start}>{getDate(timestamp_wrk_start)}</p>
            <p className={styles.info_end}>{getDate(timestamp_wrk_end)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
