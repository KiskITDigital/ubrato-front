import { FC, useEffect, useState } from "react"
import s from './styles.module.css'
import { Hits, InstantSearch, SearchBox, SortBy } from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
// import { TenderListElem } from "../TenderListElement/inedx";



export const TenderListComp: FC = () => {
  
const [searchClient, setSearchClient] = useState(null);


useEffect(() => {
  const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
      server: {
          apiKey: 'R5PQLVrGuPubEcLIdGIJhjip5kvdXbFu',
          nodes: [
              {
                  host: 'search.ubrato.ru',
                  port: 443,
                  protocol: 'https',
                  path: "",
                  // tls:true
              }
          ]
      },
      additionalSearchParameters: {
          query_by: "name",
          // sort_by: 'region_id:asc',
      },
  });
  // const searchClient = typesenseInstantsearchAdapter.searchClient
  setSearchClient(typesenseInstantsearchAdapter.searchClient)
}, [])



  return(
    <div className={s.list_header_container}>
    {
  searchClient &&
    <div className={s.block}>
        <InstantSearch indexName='tender_index' searchClient={searchClient}>
            {/* <p className={s.title}>Локации:</p> */}
            <label className={s.inputFilterLabel}>
                <img className={s.inputFilterLabelImg} src="/find-executor/loupe.svg" alt="loupe" />
                <SearchBox
                    className={s.inputFilter}
                    placeholder="Населенный пункт" />
            </label>
            <SortBy items={[
              {label: "std", value:'city_index'},
              {label: "asc", value:'tender_index/sort/price:asc'},
              {label: "desc", value:'tender_index/sort/price:desc'}
            ]}></SortBy>
            <Hits 
            // hitComponent={TenderListElem} 
            />
        </InstantSearch>
    </div>
}
    </div>
  );
};