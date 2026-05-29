'use client'
import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Student } from "../entities/student.entity";
import { createStudent } from "../server/create-student";
import { updateStudent } from "../server/update-student";
import { studentCreateSchema, studentUpdateSchema, type StudentCreateInput, type StudentUpdateInput } from "../schema";




export const useStudent = (student?: Student) => {

    const router = useRouter();
    const queryClient = useQueryClient();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const onOpenModalChange = (open: boolean) => {
        setIsOpenModal(open);
    }

    const createForm = useForm<StudentCreateInput>({
        resolver: zodResolver(studentCreateSchema),
        defaultValues: {
            name: '',
            documentNumber: '',
            documentType: '',
            email: '',
            lastName: '',
            nationality: '',
            phone: '',
        }
    });

    const updateForm = useForm<StudentUpdateInput>({
        resolver: zodResolver(studentUpdateSchema),
        defaultValues: {
            ...student,
            phone: student?.phone || undefined,
        }
    })

    useEffect(() => {
        if (student) {
            updateForm.reset({
                ...student,
                phone: student?.phone || undefined,
            });
        }
    }, [student, updateForm]);

    const revalidateStudents = async () => {
        queryClient.invalidateQueries({ queryKey: ['students-stats'] });
        await router.invalidate();
    }

    const createMutation = useMutation({
        mutationFn: createStudent,
        mutationKey: ["create-student"],
        onSuccess: async ({ data, error }) => {

            if (error) {
                toast.error(error)
                return
            }

            if (!data) {
                toast.error('Error al crear el estudiante')
                return
            }

            createForm.reset()
            toast.success(data?.message)
            await revalidateStudents()
        }
    })

    const updateMutation = useMutation({
        mutationFn: updateStudent,
        mutationKey: ["update-students"],
        onSuccess: async ({ data, error }) => {
            if (error) {
                toast.error(error)
                return
            }

            if (!data) {
                toast.error('Error al actualizar el estudiante')
                return
            }
            updateForm.reset();
            toast.success(data?.message)
            await revalidateStudents()
            setIsOpenModal(false)
        }
    })


    const handleCreate = createForm.handleSubmit((values) => createMutation.mutate({ data: values }))

    const handleUpdate = updateForm.handleSubmit(async (values) => {
        await updateMutation.mutateAsync({data: values})
    })

    return {
        createForm,
        updateForm,
        isOpenModal,

        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,

        onOpenModalChange,
        handleCreate,
        handleUpdate,
    }
}
