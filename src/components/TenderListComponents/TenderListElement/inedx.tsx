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
}

interface CustomHitProps {
    hit: Hit & BaseHit;
}

export const TenderListElem: FC<CustomHitProps> = ({hit}) => {
  console.log(hit);

  const toDate = (date: number) =>{
    const timestamp = date
    const newDate = new Date(timestamp * 1000);
    return newDate
  } 




  return(
    <Link to={`/tender/${hit.id}`}>
    <div 
    className={s.hit_block}
    >
        <p>ч</p>
        <h3>{hit.name}</h3>
        <p>е</p>
        <p>{toDate(hit.reception_end).toLocaleString()}</p>
        <p>а</p>
        <p>{toDate(hit.work_start).toLocaleString()}</p>
        <p>{toDate(hit.work_end).toLocaleString()}</p>
    </div>
    </Link>
  );
};