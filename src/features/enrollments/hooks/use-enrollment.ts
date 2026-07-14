import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { enrollmentCreateSchema } from "../schema";
import { PaymentMethod } from "../types/payment-methods.enum";
import { createEnrollment } from "../server/create-enrollment";

const getDefaultEnrollmentValues = () => ({
    courseId: '',
    studentId: '',
    paymentMethod: PaymentMethod.BANK_TRANSFER,
});

export const useEnrollment = () => {

    const router = useRouter();
    const [isOpenModal, setIsOpenModal] = useState(false);

    // ======== FORMS ==========
    const createForm = useForm({
        resolver: zodResolver(enrollmentCreateSchema),
        defaultValues: getDefaultEnrollmentValues(),
    });

    const onOpenModalChange = (open: boolean) => {
        setIsOpenModal(open);
    };

    // ========= MUTATIONS ==========
    const createMutation = useMutation({
        mutationFn: createEnrollment,
        mutationKey: ["create-enrollment"],
        onSuccess: async ({ data, error }) => {
            if (error) {
                toast.error(error);
                return;
            }

            if (!data) {
                toast.error("Error al crear la inscripción");
                return;
            }

            createForm.reset(getDefaultEnrollmentValues());
            toast.success("Inscripción creada exitosamente");
            await router.invalidate({ sync: true });
            setIsOpenModal(false);
        },
    })

    // ========== HANDLERS ==========
    const handleCreate = createForm.handleSubmit(async (data) => {
        await createMutation.mutateAsync({ data });
    });

    return {
        createForm,
        isOpenModal,

        isCreating: createMutation.isPending,

        onOpenModalChange,
        handleCreate,
    }
};