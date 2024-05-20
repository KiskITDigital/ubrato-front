import { FC, useEffect, useState } from "react"
import s from './styles.module.css'
import { Hits, InstantSearch, Pagination, SearchBox, SortBy } from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { TenderListElem } from "../TenderListElement/inedx";
// import { fetchProduct } from "@/api/getTender";



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
          query_by: "description,name",
          per_page: 4,
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
                {/* <img className={s.inputFilterLabelImg} src="/find-executor/loupe.svg" alt="loupe" /> */}
                <SearchBox
                    className={s.inputFilter}
                    placeholder="Убейте меня" />
            </label>
            <div className={s.sort}>
            <SortBy items={[
              {label: "std", value:'tender_index'},
              {label: "asc", value:'tender_index/sort/price:asc'},
              {label: "desc", value:'tender_index/sort/price:desc'}
            ]}></SortBy>
             <SortBy items={[
              {label: "rcpt", value:'tender_index'},
              {label: "asc", value:'tender_index/sort/reception_end:asc'},
              {label: "desc", value:'tender_index/sort/reception_end:desc'}
            ]}></SortBy>
             <SortBy items={[
              {label: "wrk", value:'tender_index'},
              {label: "asc", value:'tender_index/sort/work_start:asc'},
              {label: "desc", value:'tender_index/sort/work_start:desc'}
            ]}></SortBy>
             <SortBy items={[
              {label: "wrk", value:'tender_index'},
              {label: "asc", value:'tender_index/sort/work_end:asc'},
              {label: "desc", value:'tender_index/sort/work_end:desc'}
            ]}></SortBy>
            </div>
            <Hits 
            classNames={{
              list: `${s.listnigger2}`
            }}
            hitComponent={TenderListElem} 
            />
            <Pagination classNames={{
              root: `${s.rootnigger}`,
              list: `${s.listnigger}`,
              item: `${s.item}`,
              selectedItem: `${s.selected_item_pagination}`
            }}></Pagination>
        </InstantSearch>
    </div>
}
    </div>
  );
};