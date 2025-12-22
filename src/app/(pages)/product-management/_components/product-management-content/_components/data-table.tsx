"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const categoryColumn = table.getColumn("category");
  const categoryOptions = React.useMemo(() => {
    if (!categoryColumn) return [] as string[];

    const set = new Set<string>();
    for (const row of data as unknown as Array<{ category?: unknown }>) {
      const value = row?.category;
      if (value === undefined || value === null) continue;
      const label = String(value).trim();
      if (label) set.add(label);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [categoryColumn, data]);

  const selectedCategory =
    (categoryColumn?.getFilterValue() as string | undefined) ?? "all";
  const setSelectedCategory = (value: string) => {
    if (!categoryColumn) return;
    categoryColumn.setFilterValue(value === "all" ? undefined : value);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input
            placeholder="Filter by product name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full md:max-w-sm"
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:justify-end">
            {/* Category filter (mobile) */}
            {categoryColumn && categoryOptions.length > 0 ? (
              <div className="w-full md:hidden">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectItem value="all">All categories</SelectItem>
                    {categoryOptions.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Category filter chips (desktop) */}
        {categoryColumn && categoryOptions.length > 0 ? (
          <div className="hidden flex-wrap gap-2 md:flex">
            <Button
              type="button"
              size="sm"
              variant={selectedCategory === "all" ? "secondary" : "outline"}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {categoryOptions.map((c) => (
              <Button
                key={c}
                type="button"
                size="sm"
                variant={selectedCategory === c ? "secondary" : "outline"}
                onClick={() => setSelectedCategory(c)}
                className="capitalize"
              >
                {c}
              </Button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="w-full overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width:
                          header.getSize() !== 150
                            ? `${header.getSize()}px`
                            : undefined,
                        minWidth:
                          header.getSize() !== 150
                            ? `${header.getSize()}px`
                            : undefined,
                        maxWidth:
                          header.getSize() !== 150
                            ? `${header.getSize()}px`
                            : undefined,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width:
                          cell.column.getSize() !== 150
                            ? `${cell.column.getSize()}px`
                            : undefined,
                        minWidth:
                          cell.column.getSize() !== 150
                            ? `${cell.column.getSize()}px`
                            : undefined,
                        maxWidth:
                          cell.column.getSize() !== 150
                            ? `${cell.column.getSize()}px`
                            : undefined,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-muted-foreground text-sm">
          {table.getFilteredRowModel().rows.length} product(s)
        </div>
        <div className="flex w-full gap-2 sm:w-auto sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex-1 sm:flex-none"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex-1 sm:flex-none"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
