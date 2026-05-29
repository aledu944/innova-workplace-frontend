import { useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, type VisibilityState, type ColumnDef, type SortingState, type ColumnFiltersState } from "@tanstack/react-table";

import { DataTableFilters } from "./data-table-filters";
import type { PaginationMeta } from "#/shared/types/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardContent } from "../ui/card";
import { PaginationButtons } from "./pagination-buttons";


interface DataTableProps<TData> {
    title: string;
    data: TData[];
    isLoading?: boolean;
    globalFilterField?: string;
    columns: ColumnDef<TData, any>[];
    meta?: PaginationMeta | undefined;
    actions: React.ReactNode;
}

export function DataTable<TData>({
    actions,
    title,
    columns,
    data,
    meta,
    isLoading,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data: data ?? [],
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
    });

    return (
        <Card>
            <CardContent>

                {title && <h2 className="text-lg mb-2">{title}</h2>}

                <div className="flex flex-row">
                    <DataTableFilters
                        table={table}
                    />
                    {actions}
                </div>

                <div className="border rounded-md overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted">
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHead key={header.id} className="p-4">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map(row => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell className="py-4" key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="h-4">
                                    <TableCell colSpan={columns.length || 1} className="">
                                        {isLoading ? "Cargando..." : "No results."}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {
                    meta && (
                        <div className="flex items-center justify-between px-6 py-4">
                            <PaginationButtons page={meta.page} totalPages={meta.lastPage} />
                        </div>
                    )
                }
                </div>
            </CardContent>
        </Card>
    );
}
