import { ArrowLeftIcon } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { CourseForm } from "#/features/courses/components/course-form";
import { useCourse } from "#/features/courses/hooks/use-course";
import { getCourse } from "#/features/courses/server/get-course";
import { Button } from "#/shared/components/ui/button";

export const Route = createFileRoute("/admin/courses/$slug/edit")({
    loader: ({ params }) => getCourse({ data: { slug: params.slug } }),
    component: RouteComponent,
});

const coursesSearch = { page: 1, limit: 10, search: "" };

function RouteComponent() {
    const { course } = Route.useLoaderData();
    const {
        updateForm,
        handleUpdate,
        isUpdating,
        isUploadingImage,
        uploadCourseImage,
    } = useCourse(course, { redirectOnSuccess: true });

    return (
        <>
            <header className="py-6">
                <div className="container flex flex-col gap-4">
                    <Button asChild variant="ghost" size="sm" className="w-fit">
                        <Link to="/admin/courses" search={coursesSearch}>
                            <ArrowLeftIcon className="size-4" />
                            Cursos
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">Editar curso</h1>
                        <p className="text-muted-foreground">
                            Actualiza la información, el instructor y el contenido de {course.title}.
                        </p>
                    </div>
                </div>
            </header>

            <section>
                <div className="container">
                    <CourseForm
                        form={updateForm}
                        onSubmit={handleUpdate}
                        onUploadImage={uploadCourseImage}
                        isSubmitting={isUpdating}
                        isUploadingImage={isUploadingImage}
                        submitLabel="Guardar cambios"
                    />
                </div>
            </section>
        </>
    );
}
