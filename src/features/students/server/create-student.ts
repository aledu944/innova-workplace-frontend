import apiClient from '@/shared/lib/api-client';
import { createServerFn } from '@tanstack/react-start';
import { handleServerFunctionError } from '@/shared/helpers';
import { studentCreateSchema } from '../schema';


export const createStudent = createServerFn({ method: "POST" })
    .inputValidator(studentCreateSchema)
    .handler(async ({ data: student }) => {
        try {
            const { data } = await apiClient.post<{ message: string; }>("/students", student);

            return {
                data,
                error: null
            };

        } catch (error) {
            return handleServerFunctionError(error);
        }
    })

