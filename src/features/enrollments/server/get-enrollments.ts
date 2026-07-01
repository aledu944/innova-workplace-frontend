import { createServerFn } from '@tanstack/react-start';

import { EnrollmentMapper } from '../mappers/enrollment.mapper';
import apiClient from '@/shared/lib/api-client.server';
import type { GetEnrollmentsResponse } from '../types/get-enrollments-response.interface';
import type { RequestFilterOptions } from '@/shared/types/filtered-pagination-options.interface';



export const getEnrollments = createServerFn()
    .inputValidator((input: RequestFilterOptions) => input)
    .handler(
        async ({ data: filters }) => {
            const { data } = await apiClient.get<GetEnrollmentsResponse>('/enrollments', {
                params: filters,
            });

            const enrollments = data.enrollments.map(EnrollmentMapper.fromResponseToEntity);

            return {
                enrollments,
                meta: data.meta,
            };
        }
    );
