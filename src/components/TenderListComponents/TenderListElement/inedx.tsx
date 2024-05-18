import { FC } from "react"
// import s from './styles.module.css'
// import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
// import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

interface CustomHitProps {
    hit: any;
  }

export const TenderListElem: FC<CustomHitProps> = ({hit}) => {
  return(
    <div 
    // className={s.list_header_container}
    >
        <h3>{hit.name}</h3>
    </div>
  );
};