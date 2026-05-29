// src/shared/components/data-table/data-table-search-input.tsx

import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react';

import { useDataTableSearch } from '#/shared/hooks/use-data-table-search';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon, Search01Icon } from '@hugeicons/core-free-icons';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';

interface Props {
    placeholder: string;
}

export const DataTableSearchInput = ({ placeholder }: Props) => {
    const { search, setSearch } = useDataTableSearch();

    const [searchInput, setSearchInput] = useState(search);

    useEffect(() => {
        setSearchInput(search);

        if (search.trim() === '') {
            handleSearch();
        }

    }, [search]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleSearch = () => {
        setSearch(searchInput.trim());
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const resetSearch = () => {
        setSearchInput('');
        setSearch('');
    };

    return (
        <div className="relative flex w-full max-w-sm items-center">

            <InputGroup>
                <InputGroupAddon>
                    <HugeiconsIcon
                        icon={Search01Icon}
                    />
                </InputGroupAddon>
                <InputGroupInput
                    value={searchInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="pl-10 pr-10 shadow-none"
                    placeholder={placeholder}
                />
            </InputGroup>

            {searchInput && (
                <button
                    type="button"
                    onClick={resetSearch}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                    <HugeiconsIcon
                        icon={Cancel01Icon}
                    />
                </button>
            )}
        </div>
    );
};
