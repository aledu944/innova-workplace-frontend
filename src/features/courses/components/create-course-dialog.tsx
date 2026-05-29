"use client";

import { CourseForm } from "./course-form";
import { useCourse } from "../hooks/use-course";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";

export const CreateCourseDialog = () => {
    const {
        createForm,
        handleCreate,
        isCreating,
        isOpenModal,
        isUploadingImage,
        onOpenModalChange,
        uploadCourseImage,
    } = useCourse();

    return (
        <Dialog open={isOpenModal} onOpenChange={onOpenModalChange}>
            <DialogTrigger asChild>
                <Button>+ Nuevo curso</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Crear curso</DialogTitle>
                </DialogHeader>
                <CourseForm
                    form={createForm}
                    onSubmit={handleCreate}
                    onUploadImage={uploadCourseImage}
                    isSubmitting={isCreating}
                    isUploadingImage={isUploadingImage}
                    submitLabel="Crear curso"
                />
            </DialogContent>
        </Dialog>
    );
};
