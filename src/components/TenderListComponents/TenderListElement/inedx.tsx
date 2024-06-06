import { FC } from "react";
import s from "./styles.module.css";
import { Link } from "react-router-dom";
import { BaseHit } from "instantsearch.js";

interface Hit {
  id: number;
  name: string;
  reception_end: string;
  work_start: string;
  work_end: string;
  price: number;
  city: string;
}

interface CustomHitProps {
  hit: Hit & BaseHit;
}

export const TenderListElem: FC<CustomHitProps> = ({ hit }) => {
  // console.log(hit);

  const toDate = (date: string) => {
    const timestamp = date;
    const newDate = new Date(Date.parse(timestamp));
    newDate.setHours(0, 0, 0, 0);
    const formattedDate = newDate.toISOString().split("T")[0];
    return formattedDate;
  };

  function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;

    const truncatedStr = str.slice(0, maxLength);
    const lastSpaceIndex = truncatedStr.lastIndexOf(" ");

    if (lastSpaceIndex !== -1) {
      return truncatedStr.slice(0, lastSpaceIndex);
    } else {
      return truncatedStr;
    }
  }

  return (
    <Link to={`/tender/${hit.id}`}>
      <div className={s.hit_block}>
        <div className={s.hit_header}>
          <h3>{truncateString(hit.name, 20)}</h3>
        </div>
        <div className={s.hit_rcp}>
          <p>{toDate(hit.reception_end)}</p>
        </div>
        <div className={s.hit_wrk}>
          <p>{toDate(hit.work_start)}</p>
        </div>
        <div className={s.hit_arrow}>➔</div>
        <div className={s.hit_wrkE}>
          <p>{toDate(hit.work_end)}</p>
        </div>
        <div className={s.hit_price}>
          <p>{hit.price} ₽</p>
        </div>
        <div className={s.hit_city}>
          <p>{hit.city}</p>
          {/* {
                                        hit.city.map((region) => <p key={region.id} className={styles.executorRegion}>{region.name}</p>)
                                    } */}
        </div>
      </div>
    </Link>
  );
};
