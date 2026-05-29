"use client";

import { PencilIcon } from "lucide-react";

import type { Course } from "../entities/course.entity";
import { CourseForm } from "./course-form";
import { useCourse } from "../hooks/use-course";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";

interface Props {
    course: Course;
}

export const EditCourseDialog = ({ course }: Props) => {
    const {
        updateForm,
        handleUpdate,
        isOpenModal,
        isUpdating,
        isUploadingImage,
        onOpenModalChange,
        uploadCourseImage,
    } = useCourse(course);

    return (
        <Dialog open={isOpenModal} onOpenChange={onOpenModalChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <PencilIcon className="size-4" />
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Editar curso</DialogTitle>
                </DialogHeader>
                <CourseForm
                    form={updateForm}
                    onSubmit={handleUpdate}
                    onUploadImage={uploadCourseImage}
                    isSubmitting={isUpdating}
                    isUploadingImage={isUploadingImage}
                    submitLabel="Guardar cambios"
                />
            </DialogContent>
        </Dialog>
    );
};
