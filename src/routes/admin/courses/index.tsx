import { CourseGrid } from "#/features/courses/components/course-grid";
import { getCourses } from "#/features/courses/server/get-courses";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/courses/")({
    component: RouteComponent,
    loaderDeps: ({ search }) => search,
    loader: ({ deps }) => getCourses({ data: deps }),
});

function RouteComponent() {
    const { courses, meta } = Route.useLoaderData();

    return (
        <>
            <header className="py-6">
                <div className="container">
                    <h1 className="text-3xl font-bold">Cursos</h1>
                    <p className="text-muted-foreground">
                        Gestiona el catálogo, las inscripciones y el contenido principal de tus cursos.
                    </p>
                </div>
            </header>

            <section>
                <div className="container">
                    <CourseGrid courses={courses} meta={meta} isPending={false} />
                </div>
            </section>
        </>
    );
}
