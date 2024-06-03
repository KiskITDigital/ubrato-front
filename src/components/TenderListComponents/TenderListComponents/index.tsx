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
import { useFindExecutorState } from "@/store/findExecutorStore";

interface TenderList {
  id: string;
  name: string;
  reception_end: string;
  work_start: string;
  work_end: string;
  price: number;
}
interface SortingOption {
  label: string;
  field: string;
}

export const TenderListComp: FC = () => {
  const findExecutorState = useFindExecutorState();
  const [allExecutorListLength, setAllExecutorListLength] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [paginationPerPage, setPaginationPerPage] = useState(8);
  const [tenderList, setTenderList] = useState<TenderList[]>([]);
  const [sortingValue, setSortingValue] = useState('')
  // const findExecutorState = useFindExecutorState()

  const paginationClassNames = {
    base: s.paginationBase,
    wrapper: s.wrapper,
    cursor: s.cursor,
    prev: s.prev,
    item: s.item,
    next: s.next,
  };

  useEffect(() => {
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
      if (findExecutorState.locationId)
        filters.push(`$city_index(id:=${findExecutorState.locationId})`);
      if (findExecutorState.objectTypesId.length)
        findExecutorState.objectTypesId.forEach((object) =>
          filters.push(`$tender_object(object_type_id:=${object})`)
        );
      if (findExecutorState.servicesTypesId.length)
        findExecutorState.servicesTypesId.forEach((service) =>
          filters.push(`$tender_service(service_type_id:=${service})`)
        );
      if (findExecutorState.fastFilterTexts)
        findExecutorState.fastFilterTexts.forEach((filter) =>
          filters.push(
            `( name:=*${filter}* || name:=*${filter.toLocaleLowerCase()}* || name:=*${filter.toLocaleUpperCase()}*)`
          )
        );
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

    const getAllExecutorListLengthSearchParameters = {
      q: "",
      query_by: "name",
      limit: 250,
    };

    client
      .collections("tender_index")
      .documents()
      .search(getAllExecutorListLengthSearchParameters)
      .then(async (response) => {
        setAllExecutorListLength(response?.hits?.length || 0);
        setPaginationTotal(
          response?.hits?.length
            ? Math.ceil(response.hits.length / paginationPerPage)
            : 0
        );

        console.log(response.hits);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

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
            console.log(response.hits);

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
                },
              } as { index: number; tenderData: TenderList };
            })();
          })
          .filter((promise) => promise !== null);

        const results = await Promise.all(promises);
        results
          .sort((a, b) => a!.index - b!.index)
          .forEach((result) => {
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
    findExecutorState.fastFilterTexts,
    findExecutorState.objectTypesId,
    findExecutorState.locationId,
    findExecutorState.servicesTypesId,
    sortingValue
  ]);

  const list = tenderList;
  const sortingOptions: SortingOption[] = [
    { label: "Название", field: "name" },
    { label: "Дата приема заявок", field: "reception_end" },
    { label: "Дата начала работ", field: "work_start" },
    { label: "Дата окончания работ", field: "work_end" },
    { label: "Цена", field: "price" },
  ];

  const handleSortingChange = (field: string) => {
    const direction = sortingValue === `${field}:asc`? 'desc' : 'asc';
    setSortingValue(`${field}:${direction}`);
  };
  return (
    <div>
      <div className={s.counter_tender}>
        Найдено тендеров: {allExecutorListLength}
      </div>
      <div className={s.sortingBlock}>
      {sortingOptions.map((option) => (
        <div className={s.sorting_label_field}>
          <p>{option.label}</p>
        <button
          key={option.field}
          onClick={() => handleSortingChange(option.field)}
          className={`${s.sortingButton} ${sortingValue === `${option.field}:asc`? s.asc : s.desc}`}
        >
          {sortingValue === `${option.field}:asc`? '↑' : '↑'}
        </button>
        </div>
      ))}
    </div>
      {list.map((item) => (
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
