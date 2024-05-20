import { FC } from "react"
import s from './styles.module.css'
// import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
// import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { Link } from "react-router-dom";

interface CustomHitProps {
    hit: object;
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
        <p>покажи мне</p>
        <h3>{hit.name}</h3>
        {/* <p>{toDate(hit.reception_start).toLocaleString()}</p> */}
        <p>але</p>
        <p>{toDate(hit.reception_end).toLocaleString()}</p>
        <p>жопа</p>
        <p>{toDate(hit.work_start).toLocaleString()}</p>
        <p>{toDate(hit.work_end).toLocaleString()}</p>
    </div>
    </Link>
  );
};