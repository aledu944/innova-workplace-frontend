import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { enrollmentCreateSchema } from "../schema";
import { PaymentMethod } from "../types/payment-methods.enum";
import { createEnrollment } from "../server/create-enrollment";


export const useEnrollment = () => {

    const router = useRouter();

    // ======== FORMS ==========
    const createForm = useForm({
        resolver: zodResolver(enrollmentCreateSchema),
        defaultValues: {
            courseId: '',
            studentId: '',
            paymentMethod: PaymentMethod.BANK_TRANSFER

        }
    });

    // ========= MUTATIONS ==========
    const createMutation = useMutation({
        mutationFn: createEnrollment,
        onSuccess: () => {
            createForm.reset();
            toast.success("Inscripción creada exitosamente");
            router.invalidate({ sync: true });
        },
    })

    // ========== HANDLERS ==========
    const handleCreate = createForm.handleSubmit(async (data) => {
        await createMutation.mutateAsync({ data });
    });

    return {
        createForm,

        isCreating: createMutation.isPending,

        handleCreate,
    }
};