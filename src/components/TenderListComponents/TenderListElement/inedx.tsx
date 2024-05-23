import { FC } from "react"
import s from './styles.module.css'
import { Link } from "react-router-dom";
import { BaseHit } from "instantsearch.js";

interface Hit {
  id: number;
  name: string;
  reception_end: number;
  work_start: number;
  work_end: number;
  price: number;
  city: string
}

interface CustomHitProps {
    hit: Hit & BaseHit;
}

export const TenderListElem: FC<CustomHitProps> = ({hit}) => {
  console.log(hit);

  const toDate = (date: number) =>{
    const timestamp = date
    const newDate = new Date(timestamp * 1000);
    
    return newDate.toISOString().slice(0, 10);
  } 




  return(
    <Link to={`/tender/${hit.id}`}>
    <div 
    className={s.hit_block}
    >
      <div className={s.hit_header}><h3 >{hit.name}</h3></div>  
      <div className={s.hit_rcp}><p >{toDate(hit.reception_end).toLocaleString()}</p></div>
      <div className={s.hit_wrk}><p >{toDate(hit.work_start).toLocaleString()}</p></div>
      <div className={s.hit_arrow}>➔</div>
      <div className={s.hit_wrkE}><p>{toDate(hit.work_end).toLocaleString()}</p></div>
      <div className={s.hit_price}><p>{hit.price} ₽</p></div>
      <div className={s.hit_city}><p>{hit.city}</p></div>
    </div>
    </Link>
  );
};