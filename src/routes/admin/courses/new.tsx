import { ArrowLeftIcon } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { CourseForm } from "#/features/courses/components/course-form";
import { useCourse } from "#/features/courses/hooks/use-course";
import { Button } from "#/shared/components/ui/button";

export const Route = createFileRoute("/admin/courses/new")({
    component: RouteComponent,
});

const coursesSearch = { page: 1, limit: 10, search: "" };

function RouteComponent() {
    const {
        createForm,
        handleCreate,
        isCreating,
        isUploadingImage,
        uploadCourseImage,
    } = useCourse(undefined, { redirectOnSuccess: true });

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
                        <h1 className="text-3xl font-bold">Crear curso</h1>
                        <p className="text-muted-foreground">
                            Completa la información del curso, su contenido y publicación.
                        </p>
                    </div>
                </div>
            </header>

            <section>
                <div className="container">
                    <CourseForm
                        form={createForm}
                        onSubmit={handleCreate}
                        onUploadImage={uploadCourseImage}
                        isSubmitting={isCreating}
                        isUploadingImage={isUploadingImage}
                        submitLabel="Crear curso"
                    />
                </div>
            </section>
        </>
    );
}
