import resend from "@/shared/lib/resend";
import { createServerFn } from "@tanstack/react-start";

import CreateCertificateEmail from "../template/create-certificate-email.template";
import type { Enrollment } from "../entities/enrollment.entity";

import apiClient from "@/shared/lib/api-client";
import { handleServerFunctionError } from "@/shared/helpers";


export const createCertificate = createServerFn({ method: 'POST' })
    .inputValidator((enrollment: Enrollment) => enrollment)
    .handler(
        async ({data: enrollment }) => {
            try {
                const { data } = await apiClient.post<{ id: string; }>(`/certificates`, { enrollmentId: enrollment.id });

                await resend.emails.send({
                    from: 'Innova Code <certificates@mail.innova-code.dev>',
                    to: [enrollment.student.email],
                    subject: 'Certificado de finalización 🥳',
                    react: CreateCertificateEmail({ certificateId: data.id }),
                });

                return {
                    data,
                    error: null
                };

            } catch (error) {
                return handleServerFunctionError(error);
            }
        }
    );