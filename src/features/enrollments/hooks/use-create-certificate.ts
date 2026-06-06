import { useMutation } from "@tanstack/react-query";
import { createCertificate } from "../server/create-certificate";
import type { Enrollment } from "../entities/enrollment.entity";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";



export const useCreateCertificate = (enrollment: Enrollment) => {

    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: createCertificate,
        onSuccess: () => {
            toast.success('Certificado generado correctamente');
            router.invalidate({ sync: true });
        }

    })

    const handleCreateCertificate = async () => {
        await mutateAsync({ data: enrollment})
    }


    return {
        handleCreateCertificate,
        isPending,
    }


}