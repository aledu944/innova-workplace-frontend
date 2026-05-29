import { ColumnVisibility } from './column-visibility';
import { DataTableSearchInput } from './data-table-search-input';
import { DataTableStatusFilter } from './data-table-status-filter';


interface Props {
    table: any;
}


export const DataTableFilters = ({ table }: Props) => {
    return (
        <div className="flex items-center w-full gap-4 py-4 flex-wrap">

            <DataTableSearchInput placeholder='Buscar recurso'/>
            <DataTableStatusFilter/>

            <div className="ml-auto flex items-center space-x-2">
                <ColumnVisibility table={table} />
            </div>
        </div>
    )
}
