"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { Course } from "../entities/course.entity";
import { createCourse } from "../server/create-course";
import { updateCourse } from "../server/update-course";
import {
    courseCreateSchema,
    courseUpdateSchema,
    type CourseCreateInput,
    type CourseUpdateInput,
} from "../schema";

const courseCreateResolver = zodResolver(courseCreateSchema) as Resolver<CourseCreateInput, unknown, CourseCreateInput>;
const courseUpdateResolver = zodResolver(courseUpdateSchema) as Resolver<CourseUpdateInput, unknown, CourseUpdateInput>;
const coursesSearch = { page: 1, limit: 10, search: "" };

const DEFAULT_MODULE = {
    title: "",
    summary: "",
    content: "",
    order: 1,
};

const DEFAULT_COURSE_VALUES: CourseCreateInput = {
    title: "",
    price: 0,
    currency: "USD",
    summary: "",
    overview: "",
    startDate: new Date(),
    lessons: 1,
    modality: "LIVE_ONLINE",
    level: "BEGINNER",
    duration: "",
    coverImage: "",
    whatsappLink: "",
    instructorId: "",
    isActive: true,
    openRegistrations: true,
    type: "COURSE",
    courseModules: [DEFAULT_MODULE],
};

const getDefaultCourseValues = (): CourseCreateInput => ({
    ...DEFAULT_COURSE_VALUES,
    startDate: new Date(),
    courseModules: [{ ...DEFAULT_MODULE }],
});

interface UseCourseOptions {
    redirectOnSuccess?: boolean;
}

const toDateTimeLocalValue = (date: Date) => {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60 * 1000).toISOString().slice(0, 16);
};

const toCourseUpdateInput = (course: Course): CourseUpdateInput => ({
    id: course.id,
    title: course.title,
    price: course.price,
    currency: course.currency,
    summary: course.summary,
    overview: course.overview,
    startDate: course.startDate,
    lessons: course.lessons,
    modality: course.modality,
    level: course.level,
    duration: course.duration,
    coverImage: course.coverImage,
    whatsappLink: course.whatsappLink,
    instructorId: course.instructorId ?? "",
    isActive: course.isActive,
    openRegistrations: course.openRegistrations,
    type: course.type,
    courseModules: course.courseModules.length ? course.courseModules : [DEFAULT_MODULE],
});

export const getCourseDateTimeLocalValue = (date: Date) => toDateTimeLocalValue(date);

export const useCourse = (course?: Course, options: UseCourseOptions = {}) => {
    const router = useRouter();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const redirectOnSuccess = options.redirectOnSuccess ?? false;

    const updateDefaultValues = useMemo(
        () => (course ? toCourseUpdateInput(course) : { ...getDefaultCourseValues(), id: "" }),
        [course]
    );

    const createForm = useForm<CourseCreateInput, unknown, CourseCreateInput>({
        resolver: courseCreateResolver,
        defaultValues: getDefaultCourseValues(),
    });

    const updateForm = useForm<CourseUpdateInput, unknown, CourseUpdateInput>({
        resolver: courseUpdateResolver,
        defaultValues: updateDefaultValues,
    });

    useEffect(() => {
        if (course) {
            updateForm.reset(toCourseUpdateInput(course));
        }
    }, [course, updateForm]);

    const onOpenModalChange = (open: boolean) => {
        setIsOpenModal(open);
    };

    const revalidateCourses = async () => {
        await router.invalidate();
    };

    const createMutation = useMutation({
        mutationFn: createCourse,
        mutationKey: ["create-course"],
        onSuccess: async ({ data, error }) => {
            if (error) {
                toast.error(error);
                return;
            }

            if (!data) {
                toast.error("Error al crear el curso");
                return;
            }

            createForm.reset(getDefaultCourseValues());
            toast.success(data.message);
            await revalidateCourses();
            if (redirectOnSuccess) {
                await router.navigate({ to: "/admin/courses", search: coursesSearch });
                return;
            }

            setIsOpenModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateCourse,
        mutationKey: ["update-course"],
        onSuccess: async ({ data, error }) => {
            if (error) {
                toast.error(error);
                return;
            }

            if (!data) {
                toast.error("Error al actualizar el curso");
                return;
            }

            updateForm.reset();
            toast.success(data.message);
            await revalidateCourses();
            if (redirectOnSuccess) {
                await router.navigate({ to: "/admin/courses", search: coursesSearch });
                return;
            }

            setIsOpenModal(false);
        },
    });

    const uploadCourseImage = async (file: File, onImageUploaded: (url: string) => void) => {
        const uploadUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

        if (!uploadUrl) {
            toast.error("Configura VITE_CLOUDINARY_UPLOAD_URL para subir imágenes");
            return;
        }

        try {
            setIsUploadingImage(true);
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            const imageUrl = data.imageUrl ?? data.url ?? data.secure_url;

            if (!imageUrl) {
                throw new Error("Missing image URL");
            }

            onImageUploaded(imageUrl);
            toast.success("Imagen subida correctamente");
        } catch (error) {
            toast.error("Error al subir la imagen del curso");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleCreate = createForm.handleSubmit((values) => createMutation.mutate({ data: values }));

    const handleUpdate = updateForm.handleSubmit(async (values) => {
        await updateMutation.mutateAsync({ data: values });
    });

    return {
        createForm,
        updateForm,
        isOpenModal,
        isUploadingImage,

        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,

        onOpenModalChange,
        uploadCourseImage,
        handleCreate,
        handleUpdate,
    };
};
