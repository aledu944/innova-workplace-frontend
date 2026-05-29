// src/shared/components/data-table/data-table-status-filter.tsx

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '#/shared/components/ui/select';
import { useNavigate, useSearch } from '@tanstack/react-router';

type StatusValue = 'all' | 'true' | 'false';

export const DataTableStatusFilter = () => {
    const { isActive } = useSearch({ strict: false }) as any;
    const navigate = useNavigate();

    const handleChange = (selected: StatusValue) => {
        navigate({
            to: '.',
            replace: true,
            search: (prev) => ({
                ...prev,
                page: 1,
                isActive: selected === 'all' ? undefined : selected,
            }),
        });
    };

    return (
        <Select
            value={isActive ?? 'all'}
            onValueChange={(value) => handleChange(value as StatusValue)}
        >
            <SelectTrigger className="w-full max-w-45">
                <SelectValue placeholder="Estado" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Estado</SelectLabel>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="true">Activos</SelectItem>
                    <SelectItem value="false">Inactivos</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};