import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { downloadCertificate } from "../server/download-certificate";
import type { Enrollment } from "../entities/enrollment.entity";

export const useDownloadCertificate = (enrollment: Enrollment) => {

    const { mutateAsync, isPending } = useMutation({
        mutationFn: downloadCertificate,
        onSuccess: (result) => {
            if (result.error || !result.data) {
                toast.error(result.error ?? 'No se pudo descargar el certificado');
                return;
            }

            const bytes = Uint8Array.from(atob(result.data), (c) => c.charCodeAt(0));
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `certificado-${enrollment.course.title}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);

            toast.success('Certificado descargado');
        },
        onError: () => toast.error('No se pudo descargar el certificado'),
    })

    const handleDownloadCertificate = async () => {
        if (!enrollment.certificate) return;
        await mutateAsync({ data: enrollment.certificate.id });
    }

    return {
        handleDownloadCertificate,
        isPending,
    }

}
