import {
  FC,
  // ReactNode,
  useEffect,
  useState,
} from "react";
import Typesense from "typesense";
// import { useFindExecutorState } from "@/store/findExecutorStore";
import { fetchProduct } from "@/api";
import { TenderListElem } from "../TenderListElement/inedx";
import { Pagination } from "@nextui-org/react";

import s from "./styles.module.css";
import { getMe } from "@/api/getMe";
import { useTenderListState } from "@/store/tendersListStore";
import { generateTypesenseClient } from "@/components/FindExecutorComponents/generateSearchclient";

interface TenderList {
  id: number;
  name: string;
  reception_end: string;
  work_start: string;
  work_end: string;
  price: number;
  city: string;
}
interface SortingOption {
  label: string;
  field: string;
}

interface Me {
  id: string;
}


interface myTenderToogle {
  myTender: boolean
}

export const TenderListComp: FC<myTenderToogle> = ({ myTender }) => {
  const tenderListState = useTenderListState()

  const [allExecutorListLength, setAllExecutorListLength] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [paginationPerPage, setPaginationPerPage] = useState(5);
  const [tenderList, setTenderList] = useState<TenderList[]>([]);
  const [sortingValue, setSortingValue] = useState('')
  const [meData, setMe] = useState<Me | null>(null);

  const paginationClassNames = {
    base: s.paginationBase,
    wrapper: s.wrapper,
    cursor: s.cursor,
    prev: s.prev,
    item: s.item,
    next: s.next,
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      const me = await getMe(token)
      if (me && "id" in me) setMe(me.id as Me);
    })();


    const client = new Typesense.Client({
      apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
      nodes: [
        {
          host: `${import.meta.env.VITE_TYPESENSE_API_URI}`,
          port: import.meta.env.VITE_TYPESENSE_API_PORT,
          protocol: "https",
          path: "",
        },
      ],
    });

    const filters = (() => {
      const filters = [];
      if (tenderListState.locationId)
        filters.push(`$city_index(id:=${tenderListState.locationId})`);
      if (tenderListState.objectTypesId.length)
        tenderListState.objectTypesId.forEach((object) =>
          filters.push(`$tender_object(object_type_id:=${object})`)
        );
      if (tenderListState.servicesTypesId.length)
        tenderListState.servicesTypesId.forEach((service) =>
          filters.push(`$tender_service(service_type_id:=${service})`)
        );
      if (tenderListState.fastFilterTexts)
        tenderListState.fastFilterTexts.forEach((filter) =>
          filters.push(
            `( name:=*${filter}* || name:=*${filter.toLocaleLowerCase()}* || name:=*${filter.toLocaleUpperCase()}*)`
          )
        );
      if (myTender) {
        filters.push(`( user_id:=${meData})`)
      }
      return filters.join(" && ");
    })();

    const searchParameters = {
      q: "",
      query_by: "name",
      per_page: paginationPerPage,
      page: paginationPage,
      filter_by: filters,
      sort_by: sortingValue
    };

    (async () => {
      const hitsWithoutPagination = await generateTypesenseClient("tender_index", { filter_by: filters })
      setAllExecutorListLength(hitsWithoutPagination?.length || 0)
      setPaginationTotal(
        hitsWithoutPagination?.length
          ? Math.ceil(hitsWithoutPagination.length / paginationPerPage)
          : 0
      );
    })()

    client
      .collections("tender_index")
      .documents()
      .search(searchParameters)
      .then(async (response) => {
        const tenders = [] as TenderList[];
        const promises = (response.hits || [])
          .map((res, index) => {
            const { id } = res.document as { id: string };
            if (!id) return null;
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
                  price: data.price,
                  user: data.user_id,
                  city: data.location
                },
              } as { index: number; tenderData: TenderList };
            })();
          })
          .filter((promise) => promise !== null);

        const results = await Promise.all(promises);
        results
          .sort((a, b) => a!.index - b!.index)
          .forEach((result) => {
            console.log(result?.tenderData);
            tenders.push(result!.tenderData);
          });
        setTenderList(tenders);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  }, [
    paginationPage,
    paginationPerPage,
    tenderListState.fastFilterTexts,
    tenderListState.objectTypesId,
    tenderListState.locationId,
    tenderListState.servicesTypesId,
    meData,
    sortingValue,
    myTender
  ]);

  // const list = tenderList;
  const sortingOptions: SortingOption[] = [
    { label: "Название", field: "name" },
    { label: "Дата приема заявок", field: "reception_end" },
    { label: "Дата начала работ", field: "work_start" },
    { label: "Дата окончания работ", field: "work_end" },
    { label: "Цена", field: "price" },
  ];

  const handleSortingChange = (field: string) => {
    const direction = sortingValue === `${field}:asc` ? 'desc' : 'asc';
    setSortingValue(`${field}:${direction}`);
  };
  return (
    <div>
      <div className={s.counter_tender}>
        Найдено тендеров: {tenderList.length}
      </div>
      {/* {JSON.stringify(tenderList, null, 4)} */}
      <div className={s.sortingBlock}>
        {sortingOptions.map((option) => (
          <div className={s.sorting_label_field}>
            <p>{option.label}</p>
            <button
              key={option.field}
              onClick={() => handleSortingChange(option.field)}
              className={`${s.sortingButton} ${sortingValue === `${option.field}:asc` ? s.asc : s.desc}`}
            >
              {sortingValue === `${option.field}:asc` ? '↑' : '↑'}
            </button>
          </div>
        ))}
      </div>
      {tenderList.map((item) => (
        <TenderListElem key={item.id} hit={item}></TenderListElem>
      ))}

      {allExecutorListLength > tenderList.length && (
        <>
          <button
            onClick={() => setPaginationPerPage((prev) => prev + 2)}
            className={s.showMore}
          >
            Показать еще
            <img src="/find-executor/arrow-down.svg" alt="" />
          </button>
          {!!paginationTotal && (
            <Pagination
              classNames={paginationClassNames}
              total={paginationTotal}
              showControls
              initialPage={1}
              page={paginationPage}
              onChange={setPaginationPage}
            />
          )}
        </>
      )}
    </div>
  );
};
