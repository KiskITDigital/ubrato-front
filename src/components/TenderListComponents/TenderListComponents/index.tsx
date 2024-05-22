import { FC, useEffect, useState } from "react"
import s from './styles.module.css'
import { Hits, InstantSearch, Pagination, SearchBox, SortBy } from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { TenderListElem } from "../TenderListElement/inedx";



export const TenderListComp: FC = () => { 
const [searchClient, setSearchClient] = useState(null);



useEffect(() => {
  const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
      server: {
          apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
          nodes: [
              {
                  host: `${import.meta.env.VITE_TYPESENSE_API_URI}`,
                  port: import.meta.env.VITE_TYPESENSE_API_PORT,
                  protocol: 'https',
                  path: "",
              }
          ]
      },
      additionalSearchParameters: {
          query_by: "description,name",
          per_page: 4,
      },
  });
  setSearchClient(typesenseInstantsearchAdapter.searchClient)
}, [])


  return(
    <div className={s.list_header_container}>
    {
  searchClient &&
    <div className={s.block}>
        <InstantSearch indexName='tender_index' searchClient={searchClient}>
            <label className={s.inputFilterLabel}>
                <SearchBox
                    className={s.inputFilter}
                    placeholder="Поиск" />
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
              list: `${s.hitsList}`,
              item: `${s.hitsItem}`,
              root: `${s.hitsRoot}`
            }}
            hitComponent={TenderListElem} 
            />
            <Pagination classNames={{
              root: `${s.paginationRoot}`,
              list: `${s.paginationList}`,
              item: `${s.paginationItem}`,
              selectedItem: `${s.selected_item_pagination}`
            }}></Pagination>
        </InstantSearch>
    </div>
}
    </div>
  );
};