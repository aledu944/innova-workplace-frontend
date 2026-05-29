'use client'
import type { Table } from '@tanstack/react-table';
import { Button } from '../ui/button'
import { HugeiconsIcon } from '@hugeicons/react';
import { LayoutThreeColumnIcon } from '@hugeicons/core-free-icons';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface Props {
    table: Table<any>;
}

export const ColumnVisibility = ({ table }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <HugeiconsIcon
                        icon={LayoutThreeColumnIcon}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {table
                    .getAllColumns()
                    .filter((col: any) => col.getCanHide())
                    .map((col: any) => (
                        <DropdownMenuCheckboxItem
                            key={col.id}
                            className="capitalize"
                            checked={col.getIsVisible()}
                            onCheckedChange={(v: any) => col.toggleVisibility(!!v)}
                        >
                            {col.columnDef.meta?.name}
                        </DropdownMenuCheckboxItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
