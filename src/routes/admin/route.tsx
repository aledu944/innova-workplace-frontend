import { Sidebar } from '#/shared/layouts/sidebar';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <main className='flex h-screen'>

                <Sidebar />

            </main>
        </>
    );
}
