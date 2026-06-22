import { Sidebar } from '#/shared/layouts/sidebar';
import { dataTableSearchSchema } from '#/shared/schemas/data-table-search.schema';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { getSession } from '#/features/auth/server/get-session.server';


export const Route = createFileRoute('/admin')({
    beforeLoad: () => getSession(),
    validateSearch: dataTableSearchSchema,
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <main className='flex-1 overflow-y-auto pb-8'>
                    <Outlet />
                </main>
            </div>
        </>
    );
}
