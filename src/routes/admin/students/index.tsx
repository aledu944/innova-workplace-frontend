import { StudentCardStats } from '#/features/students/components/student-card-stats';
import { StudentTable } from '#/features/students/components/student-table';
import { getStudents } from '#/features/students/server/get-students';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/students/')({
    component: RouteComponent,
    loaderDeps: ({ search }) => search,
    loader: ({ deps }) => getStudents({ data: deps }),
});

function RouteComponent() {

    const { meta, students } = Route.useLoaderData()

    return (
        <>
            <header className='py-6'>
                <div className="container">
                    <h1 className='text-3xl font-bold'>Estudiantes</h1>
                    <p className='text-muted-foreground'>
                        Aquí puedes gestionar los estudiantes registrados en la plataforma.
                    </p>
                </div>
            </header>


            <section>
                <div className="container space-y-8">
                    <StudentCardStats/>
                    <StudentTable students={students} meta={meta} isPending={false} />
                </div>
            </section>
        </>
    );
}
