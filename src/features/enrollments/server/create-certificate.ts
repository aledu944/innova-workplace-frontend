'use server'

import apiClient from "@/lib/api-client"
import resend from "@/lib/resend"
import { isAxiosError } from "axios"
import CreateCertificateEmail from "../template/create-certificate-email.template"
import { EnrollmentSummary } from "../interfaces/enrollment.interface"


export const createCertificate = async (enrollment: EnrollmentSummary) => {

    try {

        const { data } = await apiClient.post<{ id: string }>(`/certificates`, { enrollmentId: enrollment.id })

        await resend.emails.send({
            from: 'Innova Code <certificates@mail.innova-code.dev>',
            to: [enrollment.student.email],
            subject: 'Certificado de finalización 🥳',
            react: CreateCertificateEmail({ certificateId: data.id }),
        });

        return {
            data,
            error: null
        }

    } catch (error) {
        console.log(error);

        if (isAxiosError(error)) {
            return {
                data: null,
                error: error.response?.data || error.message
            }
        }

        return {
            data: null,
            error: 'An unexpected error occurred'
        }

    }
}