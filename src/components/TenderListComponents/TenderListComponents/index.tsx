import { FC, 
  // ReactNode,
  useEffect, useState } from "react"
import Typesense from 'typesense'
// import { useFindExecutorState } from "@/store/findExecutorStore";
import { fetchProduct } from "@/api";
import { TenderListElem } from "../TenderListElement/inedx";
import { Pagination } from "@nextui-org/react";


import s from './styles.module.css'



interface TenderList {
  id: string;
  name: string,
  reception_end: string,
  work_start: string,
  work_end: string,
  price: number,

}


export const TenderListComp: FC = () => { 
  const [allExecutorListLength, setAllExecutorListLength] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [paginationPerPage, setPaginationPerPage] = useState(2);
  const [tenderList, setTenderList] = useState<TenderList[]>([])
  // const findExecutorState = useFindExecutorState()


  const paginationClassNames = {
    base: s.paginationBase,
    wrapper: s.wrapper,
    cursor: s.cursor,
    prev: s.prev,
    item: s.item,
    next: s.next,
}


useEffect(() => {

    const client = new Typesense.Client({
        apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
        'nodes': [
            {
                host:  `${import.meta.env.VITE_TYPESENSE_API_URI}`,
                port: import.meta.env.VITE_TYPESENSE_API_PORT,
                protocol: 'https',
                path: "",
            }
        ],
    });

    // const filters = (() => {
    //     const filters = []
    //    filters.push(`$contractor_city(city_id:=${findExecutorState.locationId})`)
    //     return filters.join(' && ')
    // })()

    const searchParameters = {
        'q': '',
        'query_by': 'name',
        'per_page': 250,
        'page': paginationPage,
    };

    const getAllExecutorListLengthSearchParameters = {
      'q': '',
      'query_by': 'name',
  }


    client.collections('tender_index').documents().search(getAllExecutorListLengthSearchParameters)
            .then(async response => {
                setAllExecutorListLength(response?.hits?.length || 0)
                setPaginationTotal((response?.hits?.length ? Math.ceil(response.hits.length / paginationPerPage) : 0))
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    client.collections('tender_index').documents().search(searchParameters)
  .then(async (response) => {
    const tenders = [] as TenderList[];

    console.log(response.hits);
    
    const promises = (response.hits || []).map((res, index) => {
      const { id } = res.document as { id: string };
      if (!id) return null;
      // console.log(response.hits);
      
      return (async () => {
          const data = await fetchProduct(id);
          return {
              index,
              tenderData: {
                  id: data.id,
                  name: data.name,
                  reception_end: data.reception_end,
                  work_start: data.work_start,
                  work_end: data.work_end,
                  price: data.price
              }
          } as { index: number, tenderData: TenderList };
      })();
  }).filter(promise => promise !== null);

  const results = await Promise.all(promises);
  results.sort((a, b) => a!.index - b!.index).forEach(result => {
    tenders.push(result!.tenderData);
});
  
    setTenderList(tenders)
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });

// console.log();



}, [paginationPerPage]);

const list = tenderList

const handleCheck  = () =>{
  console.log(list);
  
} 

  return(
    <div>
      <button onClick={handleCheck}>button</button>
      <div>{paginationPerPage}</div>
      <div>{paginationPage}</div>
      {
        list.map((item) => (
          <TenderListElem key={item.id} hit={item}></TenderListElem>
        ))
      }



{
allExecutorListLength > tenderList.length &&
<>
<button
onClick={() => setPaginationPerPage(prev => prev + 2)}
className={s.showMore}
>
Показать еще
<img src="/find-executor/arrow-down.svg" alt="" />
</button>
 {
!!paginationTotal &&
 <Pagination classNames={paginationClassNames} total={paginationTotal} showControls initialPage={1} page={paginationPage} onChange={setPaginationPage} />
   }
</>
}
    </div>
  )
};
