import { columns } from './columns';
import { DataTable } from '#/shared/components/data-table/data-table';

import type { Student } from '../../entities/student.entity';
import type { PaginationMeta } from '#/shared/types/pagination';

interface Props {
    students: Student[];
    meta: PaginationMeta;
    isPending: boolean;
}

export const StudentTable = ({ isPending, meta, students }: Props) => {

    return (
        <>
            <DataTable
                columns={columns}
                data={students}
                title={`Registro de estudiantes`}
                meta={meta}
                isLoading={isPending}
                actions={<></>}
            />
        </>
    );
};
