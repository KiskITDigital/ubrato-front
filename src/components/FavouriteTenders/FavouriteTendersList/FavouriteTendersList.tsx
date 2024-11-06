import { FC, useEffect, useState } from 'react';
import Typesense from 'typesense';
import { fetchProduct } from '@/api';
import { Pagination } from '@nextui-org/react';
import s from './styles.module.css';
import { useFindExecutorState } from '@/store/findExecutorStore';
import { getAllFavoriteTenders } from '@/api/favouriteTenders';
import { useUserInfoStore } from '@/store/userInfoStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  GlobalFilterTableState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@/utils/twMerge';
import { useNavigate } from 'react-router-dom';

interface TenderList {
  id: string;
  name: string;
  reception_end: string;
  work_start: string;
  work_end: string;
  price: number;
  city: string;
}

const DEFAULT_PER_PAGE = 15;

export const FavouriteTendersList: FC = () => {
  const findExecutorState = useFindExecutorState();
  const [allTendersListLength, setAllTendersListLength] = useState(0);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [paginationPerPage, setPaginationPerPage] = useState(DEFAULT_PER_PAGE);
  const [tenderList, setTenderList] = useState<TenderList[]>([]);
  const [sortingValue, setSortingValue] = useState('');
  const [meData, setMe] = useState<string | null>();
  const userInfo = useUserInfoStore();
  const [favoriteTenderIds, setFavoriteTenderIds] = useState<string[]>([]);

  const navigate = useNavigate();

  const paginationClassNames = {
    base: s.paginationBase,
    wrapper: s.wrapper,
    cursor: s.cursor,
    prev: s.prev,
    item: s.item,
    next: s.next,
  };

  const columns: ColumnDef<TenderList>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Название
            <img
              src={column.getIsSorted() === 'asc' ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
              className="ml-2 h-4 w-4"
            />
          </button>
        );
      },
    },
    {
      accessorKey: 'reception_end',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Дата приема заявок
            <img
              src={column.getIsSorted() === 'asc' ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
              className="ml-2 h-4 w-4"
            />
          </button>
        );
      },
      cell: ({ row }) => {
        return <p className="w-full text-center">{toDate(row.getValue('reception_end'))}</p>;
      },
    },
    {
      accessorKey: 'work_start',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Дата начала работ
            <img
              src={column.getIsSorted() === 'asc' ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
              className="ml-2 h-4 w-4"
            />
          </button>
        );
      },
      cell: ({ row }) => {
        return <p className="w-full text-center">{toDate(row.getValue('work_start'))}</p>;
      },
    },
    {
      accessorKey: 'work_end',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Дата окончания работ
            <img
              src={column.getIsSorted() === 'asc' ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
              className="ml-2 h-4 w-4"
            />
          </button>
        );
      },
      cell: ({ row }) => {
        return <p className="w-full text-center">{toDate(row.getValue('work_end'))}</p>;
      },
    },
    {
      accessorKey: 'price',
      size: 70,
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Цена
            <img
              src={column.getIsSorted() === 'asc' ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
              className="ml-2 h-4 w-4"
            />
          </button>
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

  const toDate = (date: string) => {
    const timestamp = date;
    const newDate = new Date(Date.parse(timestamp));
    // newDate.setHours(0, 0, 0, 0);
    const formattedDate = newDate.toLocaleDateString('ru-RU');
    return formattedDate;
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      // const me = await getMe(token);
      setMe(userInfo.user.id);

      // Получаем избранные тендеры
      const favoriteTendersResponse = await getAllFavoriteTenders(token);
      const favoriteTenders = favoriteTendersResponse.data;
      const favoriteIds = favoriteTenders.map((tender: TenderList) => tender.id);
      // console.log(favoriteIds);
      setFavoriteTenderIds(favoriteIds);
      setPaginationTotal(Math.ceil(favoriteIds.length / paginationPerPage));
      setAllTendersListLength(favoriteIds.length);
    })();

    const client = new Typesense.Client({
      apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
      nodes: [
        {
          host: `${import.meta.env.VITE_TYPESENSE_API_URI}`,
          port: import.meta.env.VITE_TYPESENSE_API_PORT,
          protocol: 'https',
          path: '',
        },
      ],
    });
    const filters = `id:=[${favoriteTenderIds}]`;
    // console.log(filters);

    const searchParameters = {
      q: '',
      query_by: 'name',
      per_page: paginationPerPage,
      page: paginationPage,
      filter_by: filters,
      sort_by: sortingValue,
    };
    // console.log(paginationTotal, favoriteTenderIds.length);

    client
      .collections('tender_index')
      .documents()
      .search(searchParameters)
      .then(async (response) => {
        const tenders = [] as TenderList[];
        // console.log(tenders);

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
                  city: data.city,
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
        // console.log(tenderList);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paginationPage,
    paginationPerPage,
    findExecutorState.fastFilterTexts,
    findExecutorState.objectTypesId,
    findExecutorState.locationId,
    findExecutorState.servicesTypesId,
    meData,
    sortingValue,
    favoriteTenderIds,
  ]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-[24px]">Найдено тендеров: {allTendersListLength}</div>
        {/* <div className="w-fit flex items-center gap-2">
          <p className="whitespace-nowrap">Показывать на странице</p>
          <Select
            aria-label="Показывать на странице"
            defaultSelectedKeys={[20]}
            onChange={(e) => {
              console.log(Number(e.target.value));
              setDefaultPerPage(Number(e.target.value));
            }}
            onOpenChange={(e) => {
              console.log(e);
            }}
            classNames={{
              mainWrapper:
                'flex bg-red p-[5px] w-[80px] pt-[5px] border-solid border-accent border-[2px] rounded-[6px]',
              trigger: 'flex justify-between p-0',
              selectorIcon: 'z-10 relative data-[open]:rotate-180 duration-300 transition-all',
              popoverContent:
                'p-0 pt-[10px] ml-[-7px] mt-[-5px] w-[80px] border-solid border-accent border-[2px] border-t-0 rounded-b-[6px] bg-white',
            }}
            popoverProps={{ portalContainer: portalContainer.current! }}
          >
            <SelectItem key={20}>20</SelectItem>
            <SelectItem key={50}>50</SelectItem>
            <SelectItem key={100}>100</SelectItem>
          </Select>
        </div> */}
      </div>

      <div className="mt-[20px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
              <TableRow
                key={'h-group-' + headerGroupIndex}
                className="bg-slate-200/40 hover:bg-slate-200/40"
              >
                {headerGroup.headers.map((header, headerIndex) => {
                  return (
                    <TableHead
                      key={'h-' + headerGroupIndex + headerIndex}
                      style={{ width: header.getSize() }}
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
                  key={'row' + rowIndex}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(rowIndex % 2 !== 0 ? 'bg-slate-200/40' : '', 'cursor-pointer')}
                  onClick={() => navigate(`${`/tender/${row.original.id}`}`)}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell
                      className="w-full"
                      key={'cell-' + rowIndex + cellIndex}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
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

      {allTendersListLength > tenderList.length && (
        <>
          {/* <button
            onClick={() => {
              setPaginationPage(1);
              setPaginationPerPage((prev) => prev + DEFAULT_PER_PAGE);
            }}
            className={s.showMore}
          >
            Показать ещё
            <img src="/find-executor/arrow-down.svg" alt="" />
          </button> */}
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
