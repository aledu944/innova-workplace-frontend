'use server';
import apiClient from "@/shared/lib/api-client.server";
import { createServerFn } from "@tanstack/react-start";
import type { GetEnrollmentsResponse } from "../types/get-enrollments-response.interface";
import { EnrollmentMapper } from "../mappers/enrollment.mapper";



export const getEnrollmentsByCourse = createServerFn()
    .inputValidator(() => {
        return {
            courseId: 'string'
        };
    })
    .handler(
        async ({ data: { courseId } }) => {

            const { data } = await apiClient.get<GetEnrollmentsResponse>(`/courses/enrollments/${courseId}`);

            const enrollments = data.enrollments.map(EnrollmentMapper.fromResponseToEntity);

            return {
                enrollments,
                meta: data.meta,
            }
        }
    );