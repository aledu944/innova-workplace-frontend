import apiClient from '@/shared/lib/api-client';
import { createServerFn } from '@tanstack/react-start';
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
            return {
                data: null,
                error: "Error al crear el estudiante"
            };
        }
    })

