/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  // ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Typesense from "typesense";
import { fetchProduct, updateToken } from "@/api";
import { Pagination, Select, SelectItem } from "@nextui-org/react";

import s from "./mytenders.module.css";
import { useTenderListState } from "@/store/tendersListStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  GlobalFilterTableState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "@/store/userInfoStore";
import { fetchDrafts } from "@/api/getTender";
import { addFavouriteTender, isFavoriteTender, removeFavoriteTender } from "@/api/favouriteTenders";
import { cn } from "@/utils/twMerge";

export interface TenderList {
  id: string;
  name: string;
  reception_end: string;
  work_start: string;
  work_end: string;
  price: number;
  city: string;
  is_favorite: boolean;
  categories: { name: string; services: string[] }[];
  is_nds_price: boolean;
}

interface myTenderToogle {
  drafts: boolean;
}

export const MyTenders: FC<myTenderToogle> = ({ drafts }) => {
  const tenderListState = useTenderListState();

  const [allExecutorListLength, setAllExecutorListLength] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [defaultPerPage, setDefaultPerPage] = useState<number>(20);
  const [paginationPerPage, setPaginationPerPage] = useState(defaultPerPage);
  const [tenderList, setTenderList] = useState<TenderList[]>([]);
  const [sortingValue, setSortingValue] = useState("");
  const [needUpdate, setNeedUpdate] = useState(false);

  const userInfoStore = useUserInfoStore();

  useEffect(() => {
    table.setPageSize(paginationPerPage);
  }, [paginationPerPage]);

  useEffect(() => {
    setPaginationPerPage(defaultPerPage);
  }, [defaultPerPage]);

  const paginationClassNames = {
    base: s.paginationBase,
    wrapper: s.wrapper,
    cursor: s.cursor,
    prev: s.prev,
    item: s.item,
    next: s.next,
  };
  const portalContainer = useRef<HTMLDivElement>(null);

  const toDate = (date: string) => {
    const timestamp = date;
    const newDate = new Date(Date.parse(timestamp));
    // newDate.setHours(0, 0, 0, 0);
    const formattedDate = newDate.toLocaleDateString("ru-RU");
    return formattedDate;
  };

  const columns: ColumnDef<TenderList>[] = [
    {
      accessorKey: "work_end",
    },
    { accessorKey: "is_nds_price" },
    {
      accessorKey: "id",
      header: () => {
        return (
          <div className="flex items-center w-[80px] justify-center">
            <p>ID</p>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex w-[80px]">
            <p className="text-[14px] text-center w-full">{row.getValue("id")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "is_favorite",
      header: () => {
        return (
          <div className="flex items-center">
            <img className="" src="/find-executor/heart-inactive.svg" alt="heart" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <button
            className="w-[26px] mr-[10px] h-full flex items-center"
            onClick={() => {
              if (localStorage.getItem("token")) {
                if (row.getValue("is_favorite")) {
                  updateToken(removeFavoriteTender, row.getValue("id"));
                  setNeedUpdate(!needUpdate);
                } else {
                  updateToken(addFavouriteTender, row.getValue("id"));
                  setNeedUpdate(!needUpdate);
                }
              } else {
                navigate("/login");
              }
            }}
          >
            <img
              src={`/find-executor/heart-${
                row.getValue("is_favorite") ? "active" : "inactive"
              }.svg`}
              alt="heart"
            />
          </button>
        );
      },
    },
    {
      accessorKey: "name",
      header: () => {
        return (
          <div className="flex items-center w-[165px] justify-center">
            <p>Название</p>
            {/* <img
              src={column.getIsSorted() === "asc" ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
              className="ml-2 h-4 w-4"
            /> */}
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex flex-col w-[165px] gap-3 h-full justify-center">
            <p
              onClick={() =>
                navigate(
                  `${
                    drafts ? `/create-tender?id=${row.original.id}` : `/tender/${row.original.id}`
                  }`
                )
              }
              className="text-[14px] w-[165px] text-accent text-start line-clamp-2 whitespace-normal underline cursor-pointer"
            >
              {row.getValue("name")}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "city",
      header: () => {
        return (
          <div className="flex items-center w-[130px] justify-center">
            <p>Место</p>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex gap-1 w-[130px]">
            <p className="text-[14px] text-start">{row.getValue("city")}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      size: 70,
      header: ({ column }) => {
        return (
          <button
            className="flex items-center flex-col justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Стоимость, руб
            <img
              src={column.getIsSorted() === "asc" ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
              className="ml-2 h-4 w-4"
            />
          </button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="w-[80px]">
            <p className="text-[#666] text-end">{row.getValue("price")} ₽</p>
            <p className="text-[#666] text-end">
              {row.getValue("is_nds_price") ? "с НДС" : "без НДС"}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "reception_end",
      header: ({ column }) => {
        return (
          <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <p>Приём откликов</p>{" "}
            <div className="flex items-center justify-center">
              <p>по</p>
              <img
                src={
                  column.getIsSorted() === "asc" ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"
                }
                className="ml-2 h-4 w-4"
              />
            </div>
          </button>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="w-[115px] text-center text-[rgba(0,0,0,.6)]">
            {toDate(row.getValue("reception_end"))}
          </p>
        );
      },
    },
    {
      accessorKey: "work_start",
      header: ({ column }) => {
        return (
          <div className="flex flex-col justify-center items-center w-[166px]">
            <p>Оказание услуг</p>
            <div className="flex items-center justify-between w-[80px]">
              <p>с</p>
              <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <img
                  src={
                    column.getIsSorted() === "asc" ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"
                  }
                />
              </button>
              <p>по</p>
              <button
                onClick={() => {
                  if (sorting.length === 0) {
                    setSorting([{ desc: false, id: "work_end" }]);
                  } else if (sorting[0].id === "work_end") {
                    setSorting([{ desc: !sorting[0].desc, id: "work_end" }]);
                  } else {
                    setSorting([{ desc: false, id: "work_end" }]);
                  }
                }}
              >
                <img
                  src={
                    sorting.length > 0
                      ? sorting[0].id === "work_end" && !sorting[0].desc
                        ? "/icons/arrow-up.svg"
                        : "/icons/arrow-down.svg"
                      : "/icons/arrow-down.svg"
                  }
                />
              </button>
            </div>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex gap-1">
            <p className="w-full text-center text-[rgba(0,0,0,.6)]">
              {toDate(row.getValue("work_start"))}
            </p>
            <img className="w-[11px] min-w-[11px]" src="/arrow-with-line-gray.svg" alt="" />
            <p className="w-full text-center text-[rgba(0,0,0,.6)]">
              {toDate(row.getValue("work_end"))}
            </p>
          </div>
        );
      },
    },
  ];

  const fallbackData: Array<TenderList> = [];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<GlobalFilterTableState>();
  const table = useReactTable({
    data: tenderList || fallbackData,
    columns: columns,
    enableMultiSort: true,
    manualPagination: true,
    // pageCount: paginationTotal,
    // rowCount: paginationPerPage,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    // getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
  });

  useEffect(() => {
    if (drafts) {
      (async () => {
        const drafts = await updateToken(fetchDrafts, null);
        const formatedDrafts: TenderList[] = drafts.map((draft) => ({
          id: draft.id.toString(),
          name: draft.name,
          reception_end: draft.reception_end,
          work_start: draft.work_start,
          work_end: draft.work_end,
          price: draft.price,
          city: "",
          is_favorite: false,
          categories: [],
          is_nds_price: false,
        }));
        setAllExecutorListLength(drafts.length);
        setTenderList(formatedDrafts);
      })();
    } else {
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

        filters.push(`( user_id:=${userInfoStore.user.id})`);

        return filters.join(" && ");
      })();

      const searchParameters = {
        q: tenderListState.fastFilterTexts,
        query_by: "name, description, wishes",
        per_page: paginationPerPage,
        page: paginationPage,
        filter_by: filters,
        sort_by: `${sorting.length ? `${sorting[0].id}:${sorting[0].desc ? "desc" : "asc"}` : ""}`,
        preset: "",
      };

      client
        .collections("tender_index")
        .documents()
        .search(searchParameters)
        .then(async (response) => {
          // console.log(response.hits);

          const tenders = [] as TenderList[];
          setAllExecutorListLength(response.found);
          setPaginationTotal(response?.found ? Math.ceil(response.found / paginationPerPage) : 0);
          const promises = (response.hits || [])
            .map((res, index) => {
              const { id } = res.document as { id: string };
              if (!id) return null;
              return (async () => {
                const data = await fetchProduct(id);
                return {
                  index,
                  tenderData: {
                    is_favorite: await updateToken(isFavoriteTender, id),
                    id: data.id,
                    name: data.name,
                    reception_end: data.reception_end,
                    work_start: data.work_start,
                    work_end: data.work_end,
                    price: data.price,
                    user: data.user_id,
                    city: data.location,
                    is_nds_price: data.is_nds_price,
                    categories: data.categories,
                  },
                } as { index: number; tenderData: TenderList };
              })();
            })
            .filter((promise) => promise !== null);

          const results = await Promise.all(promises);
          results
            .sort((a, b) => a!.index - b!.index)
            .forEach((result) => {
              // console.log(result?.tenderData);
              tenders.push(result!.tenderData);
            });
          setTenderList(tenders);
        })
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    }
    // console.log(allExecutorListLength);
  }, [
    paginationPage,
    paginationPerPage,
    tenderListState.fastFilterTexts,
    tenderListState.objectTypesId,
    tenderListState.locationId,
    tenderListState.servicesTypesId,
    sortingValue,
    sorting,
    userInfoStore.user.id,
    drafts,
    needUpdate,
  ]);

  const navigate = useNavigate();

  return (
    <div ref={portalContainer} className="w-full z-0">
      <div className="flex justify-between">
        <div className="text-[24px]">Найдено тендеров: {allExecutorListLength}</div>
        <div className="w-fit flex items-center gap-2">
          <p className="whitespace-nowrap">Показывать на странице</p>
          <Select
            aria-label="Показывать на странице"
            defaultSelectedKeys={[20]}
            onChange={(e) => {
              // console.log(Number(e.target.value));
              setDefaultPerPage(Number(e.target.value));
            }}
            classNames={{
              mainWrapper:
                "flex bg-red p-[5px] w-[80px] pt-[5px] border-solid border-accent border-[2px] rounded-[6px]",
              trigger: "flex justify-between p-0",
              selectorIcon: "z-10 relative data-[open]:rotate-180 duration-300 transition-all",
              popoverContent:
                "p-0 pt-[10px] ml-[-7px] mt-[-5px] w-[80px] border-solid border-accent border-[2px] border-t-0 rounded-b-[6px] bg-white",
            }}
            popoverProps={{ portalContainer: portalContainer.current! }}
          >
            <SelectItem key={20}>20</SelectItem>
            <SelectItem key={50}>50</SelectItem>
            <SelectItem key={100}>100</SelectItem>
          </Select>
        </div>
      </div>

      <div className="mt-[20px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
              <TableRow
                key={"h-group-" + Math.random()}
                className="justify-between bg-[#F4F7F9] rounded-[13px] !border border-[rgba(0,0,0,.05)] h-[65px]"
              >
                {headerGroup.headers.map((header, headerIndex) => {
                  if (headerIndex < 2) {
                    return (
                      <div className="hidden" key={"h-" + headerGroupIndex + headerIndex}></div>
                    );
                  }
                  return (
                    <TableHead
                      key={"h-" + headerGroupIndex + headerIndex}
                      // style={{ width: header.getSize() }}
                      onClick={() => {
                        setSortingValue(header.column.id);
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={"row" + rowIndex}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    rowIndex % 2 !== 0 ? "bg-slate-200/40" : "",
                    "justify-between gap-0 h-[64px] border-solid hover:border-accent !border-l-2 border-transparent"
                  )}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => {
                    if (cellIndex < 2) {
                      return <div className="hidden" key={"cell-" + rowIndex + cellIndex}></div>;
                    }
                    return (
                      <TableCell
                        className="w-fit"
                        key={"cell-" + rowIndex + cellIndex}
                        // style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Ничего не найдено.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {allExecutorListLength > tenderList.length && (
        <div className="flex flex-col w-full pt-4 gap-2">
          {/* {paginationPerPage < allExecutorListLength && (
            <button
              onClick={() => {
                setPaginationPage(1);
                setPaginationPerPage((prev) => prev + defaultPerPage);
              }}
              className={s.showMore}
            >
              Показать ещё
              <img src="/find-executor/arrow-down.svg" alt="" />
            </button>
          )} */}

          <div className="flex items-center justify-center">
            {/* <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button> */}
            {!!paginationTotal && (
              <Pagination
                classNames={paginationClassNames}
                total={paginationTotal}
                showControls
                initialPage={1}
                page={paginationPage}
                onChange={(e) => {
                  setPaginationPage(e);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
            {/* <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};
