/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { FC, useEffect, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Pagination } from '@nextui-org/react';
import { ResponsesMocks } from './responsesMocks';
import { CompanyResponse, getResponses, updateToken } from '@/api';
import { useParams } from 'react-router-dom';

export interface Response {
  id: string;
  company: Company;
  price: number;
}

export interface Company {
  name: string;
  avatar_url: string;
}

export const ResponsesTab: FC = () => {
  const id = useParams().id;

  const paginationClassNames = {
    base: 'mt-[20px]',
    wrapper: 'w-fit mx-auto',
    cursor: 'w-[44px] h-[44px] bg-light-gray rounded-[12px] z-1',
    prev: 'w-[40px] h-[44px] flex items-center justify-center',
    item: 'w-[44px] h-[44px]',
    next: 'w-[40px] h-[44px] flex items-center justify-center',
  };

  const [sortingValue, setSortingValue] = useState('');
  const [responses, setResponses] = useState<CompanyResponse[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && id) {
      (async () => {
        const res = await updateToken(getResponses, id);
        setResponses(res);
      })();
    }
  }, []);

  const columns: ColumnDef<CompanyResponse>[] = [
    {
      accessorKey: 'company_name',
      header: () => {
        return (
          <p className="text-[14px] font-normal text-[#626262] ml-[113px]">Наименование компании</p>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex w-full items-center">
            <p className="mr-[30px] text-[#626262] w-[25px]">{row.index + 1}</p>
            <img
              className="mr-[14px] w-11 h-11 rounded-[10px] border border-solid"
              src={
                row.getValue('company_avatar') ? row.getValue('company_avatar') : '/avatar-ic.svg'
              }
              alt="avatar"
            />
            <p className="text-[18px] underline underline-offset-4">
              {row.getValue('company_name')}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: 'company_avatar',
      header: '',
      cell: '',
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center text-[14px] font-normal text-[#626262]"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Стоимость
            <img
              src={column.getIsSorted() === 'asc' ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
              className="ml-2 h-auto !w-[10px] min-w-0"
            />
          </button>
        );
      },
      cell: ({ row }) => {
        return <p>{row.getValue('price')}</p>;
      },
    },
  ];

  const fallbackData: Array<Response> = [];
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: responses || fallbackData,
    columns: columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,

    state: {
      sorting: sorting,
      pagination,
    },
  });

  return (
    <div className="max-w-[1024px] mx-auto border-b border-solid border-[rgba(0,0,0,.14)] pb-[30px]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
            <TableRow key={'h-group-' + headerGroupIndex} className="justify-between">
              {headerGroup.headers.map((header, headerIndex) => {
                return (
                  <TableHead
                    key={'h-' + headerGroupIndex + headerIndex}
                    className="justify-end items-center"
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
                className="border-dashed border-[rgba(0,0,0,.14)] [&:not(:last-child)]:!border-b justify-between py-[14px] h-fit"
                // onClick={() =>
                //   navigate(
                //     `${
                //       drafts ? `/create-tender?id=${row.original.id}` : `/tender/${row.original.id}`
                //     }`
                //   )
                // }
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <TableCell
                    key={'cell-' + rowIndex + cellIndex}
                    // style={{ width: cell.column.getSize() }}
                    className="justify-end"
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
      {pagination.pageSize <= responses.length && (
        <>
          <button
            className="mt-5 w-full bg-light-gray py-[10px] rounded-xl flex justify-center items-center"
            onClick={() =>
              setPagination({
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize + 10,
              })
            }
          >
            <div className="flex gap-3 items-center">
              Показать ещё
              <img className="w-3 min-w-0" src="/arrow-down.svg" alt="arrow" />
            </div>
          </button>
          <Pagination
            classNames={paginationClassNames}
            total={table.getPageCount()}
            showControls
            initialPage={1}
            page={table.getState().pagination.pageIndex + 1}
            onChange={(page) => {
              table.setPageIndex(page - 1);
            }}
          />
        </>
      )}
    </div>
  );
};
