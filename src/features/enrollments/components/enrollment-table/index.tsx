import { columns } from './columns'

import type { PaginationMeta } from '@/shared/types/pagination';

import { DataTable } from '@/shared/components/data-table/data-table';
import type { Enrollment } from '@/features/enrollments/entities/enrollment.entity';



interface Props {
    enrollments: Enrollment[];
    meta: PaginationMeta;
    isPending: boolean;
}

export const EnrollmentsTable = ({ enrollments, isPending, meta }: Props) => {

    return (
        <>
            <DataTable
                data={enrollments}
                columns={columns}
                isLoading={isPending}
                title={`Listado de Inscripciones`}
                actions={<></>}
                meta={meta}
            />
        </>
    )
}
