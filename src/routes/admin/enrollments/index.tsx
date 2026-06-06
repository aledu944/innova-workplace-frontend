import { createFileRoute } from '@tanstack/react-router';
import { getEnrollments } from '@/features/enrollments/server/get-enrollments';
import { EnrollmentsTable } from '@/features/enrollments/components/enrollment-table';

export const Route = createFileRoute('/admin/enrollments/')({
    component: RouteComponent,
    loaderDeps: ({ search }) => search,
    loader: ({ deps }) => getEnrollments({ data: deps }),
});

function RouteComponent() {
    const { meta, enrollments } = Route.useLoaderData();

    return (
        <>
            <header className='py-6'>
                <div className="container">
                    <h1 className='text-3xl font-bold'>Inscripciones</h1>
                    <p className='text-muted-foreground'>
                        Aquí puedes gestionar las inscripciones de los estudiantes a los cursos.
                    </p>
                </div>
            </header>


            <section>
                <div className="container space-y-8">
                    <EnrollmentsTable enrollments={enrollments} meta={meta} isPending={false} />
                </div>
            </section>
        </>
    );
}
