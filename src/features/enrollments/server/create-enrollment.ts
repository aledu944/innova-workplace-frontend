'use server';
import apiClient from "@/shared/lib/api-client";
import { createServerFn } from "@tanstack/react-start";



interface CreateEnrollmentOptions {
    studentId: string;
    courseId: string;
    paymentMethod: PAYMENT_METHODS;
}


export const createEnrollment = createServerFn({ method: 'POST' })
    .inputValidator(CreateEnrollmentOptions)
    .handler(
        async ({ data: enrollment }) => {

            const { data } = await apiClient.post('/enrollments', enrollment);

            return {
                error: null,
                data,
            };
        }
    );
