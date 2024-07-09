import { FC, useEffect, useRef, useState } from "react";
import styles from "./executors.module.css";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Pagination,
} from "@nextui-org/react";
import { executorList } from "@/types/app";
import { useFindExecutorState } from "@/store/findExecutorStore";
import OfferTender from "../OfferTender/OfferTender";
import Modal from "@/components/Modal";
import { generateTypesenseClient, getExecutorList } from "../generateSearchclient";
import ExecutorList from "../ExecutorList/ExecutorList";
import {
  addFavoriteExecutor,
  removeFavoriteExecutor,
} from "@/api/index";
import { useNavigate } from "react-router-dom";

const Executors: FC = () => {
  const findExecutorState = useFindExecutorState();
  // const [executorList, setExecutorList] = useState<executorList[]>([]);
  const [allExecutorListLength, setAllExecutorListLength] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [paginationPerPage, setPaginationPerPage] = useState(2);
  const [sortingValue, setSortingValue] = useState<
    "" | "name:asc" | "name:desc"
  >("");
  const [executorIdToOfferTender, setExecutorIdToOfferTender] = useState<
    null | string
  >(null);
  const [executorNameToOfferTender, setExecutorNameToOfferTender] = useState<
    null | string
  >(null);

  const startRef = useRef<HTMLHeadingElement>(null)

  const navigate = useNavigate();

  const dropDownClassNames = {
    trigger: styles.trigger,
    base: styles.base,
    list: styles.list,
  };

  const paginationClassNames = {
    base: styles.paginationBase,
    wrapper: styles.wrapper,
    cursor: styles.cursor,
    prev: styles.prev,
    item: styles.item,
    next: styles.next,
  };

  const generateTypesenseFilters = () => {
    const filters = [];
    if (findExecutorState.locationId)
      filters.push(
        `$contractor_city(city_id:=${findExecutorState.locationId})`
      );
    if (findExecutorState.objectTypesId.length)
      findExecutorState.objectTypesId.forEach((object) =>
        filters.push(`$contractor_object(object_type_id:=${object})`)
      );
    if (findExecutorState.servicesTypesId.length)
      findExecutorState.servicesTypesId.forEach((service) =>
        filters.push(`$contractor_service(service_type_id:=${service})`)
      );
    if (findExecutorState.fastFilterTexts)
      findExecutorState.fastFilterTexts.forEach((filter) =>
        filters.push(
          `(inn:=*${filter}* || name:=*${filter}* || name:=*${filter.toLocaleLowerCase()}* || name:=*${filter.toLocaleUpperCase()}*)`
        )
      );
    return filters.join(" && ");
  }

  const favoriteExecutorsHandler = async (executor: executorList) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const res = executor.isFavorite
        ? removeFavoriteExecutor(executor.id, token)
        : addFavoriteExecutor(executor.id, token);
      const resStatus = (await res).data.status;
      findExecutorState.handleExecutorList(findExecutorState.executorList.map((executorItem) =>
        executorItem.id === executor.id
          ? {
            ...executorItem,
            isFavorite: resStatus
              ? !executorItem.isFavorite
              : executorItem.isFavorite,
          }
          : executorItem
      )
      );
    }
  }

  useEffect(() => {
    const filters = generateTypesenseFilters();

    (async () => {
      const hitsWithoutPagination = await generateTypesenseClient("contractor_index", { filter_by: filters, per_page: 250 })

      setAllExecutorListLength(hitsWithoutPagination?.length || 0)
      setPaginationTotal(
        hitsWithoutPagination?.length
          ? Math.ceil(hitsWithoutPagination.length / paginationPerPage)
          : 0
      );

      const hits = await generateTypesenseClient("contractor_index", { per_page: paginationPerPage, page: paginationPage, filter_by: filters, sort_by: sortingValue })
      if (hits?.length === 0 && paginationPage > 1) {
        setPaginationPage(1)
        return;
      }

      const newExecutorList = await getExecutorList(hits)
      findExecutorState.handleExecutorList(newExecutorList);
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    findExecutorState.objectTypesId,
    paginationPage,
    paginationPerPage,
    sortingValue,
    findExecutorState.locationId,
    findExecutorState.servicesTypesId,
    findExecutorState.servicesTypesId.length,
    findExecutorState.fastFilterTexts,
    findExecutorState.fastFilterTexts.length,
  ]);

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: "smooth" })
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 300, behavior: "smooth" });
    }, 0);
  }, [
    findExecutorState.objectTypesId,
    paginationPage,
    sortingValue,
    findExecutorState.locationId,
    findExecutorState.servicesTypesId,
    findExecutorState.servicesTypesId.length,
    findExecutorState.fastFilterTexts,
    findExecutorState.fastFilterTexts.length,
  ]);

  return (
    <div ref={startRef} className={`container ${styles.container}`}>
      {!!executorIdToOfferTender && !!executorNameToOfferTender && (
        <Modal isOpen={!!executorIdToOfferTender}>
          <OfferTender
            closeModal={setExecutorIdToOfferTender}
            executorId={executorIdToOfferTender}
            executorName={executorNameToOfferTender}
          />
        </Modal>
      )}
      <div className={styles.amount}>
        <p className={styles.number}>Исполнители: {allExecutorListLength}</p>
        <Dropdown classNames={dropDownClassNames}>
          <DropdownTrigger>
            <Button disableRipple variant="bordered">
              Рекомендуем <img src="/find-executor/drop-down.svg" alt="" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem onClick={() => setSortingValue("name:asc")}>
              По наименованию
            </DropdownItem>
            <DropdownItem onClick={() => setSortingValue("name:desc")}>
              По популярности
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <ExecutorList
        executorList={findExecutorState.executorList}
        setExecutorList={findExecutorState.handleExecutorList}
        setExecutorIdToOfferTender={setExecutorIdToOfferTender}
        setExecutorNameToOfferTender={setExecutorNameToOfferTender}
        favoriteExecutorsHandler={favoriteExecutorsHandler}
      />
      {allExecutorListLength > findExecutorState.executorList.length ? (
        <>
          <button
            onClick={() => setPaginationPerPage((prev) => prev + 2)}
            className={styles.showMore}
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
      ) : <button
        onClick={() => setPaginationPerPage((prev) => prev - 2)}
        className={styles.showMore}
      >
        Показать меньше
        <img className="rotate-180" src="/find-executor/arrow-down.svg" alt="" />
      </button>}
    </div>
  );
};

export default Executors;
