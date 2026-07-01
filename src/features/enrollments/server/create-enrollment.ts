import apiClient from "@/shared/lib/api-client.server";
import { createServerFn } from "@tanstack/react-start";
import { handleServerFunctionError } from "@/shared/helpers";
import { enrollmentCreateSchema } from "../schema";


export const createEnrollment = createServerFn({ method: 'POST' })
    .inputValidator(enrollmentCreateSchema)
    .handler(
        async ({ data: enrollment }) => {

            try {
                const { data } = await apiClient.post('/enrollments', enrollment);
    
                return {
                    error: null,
                    data,
                };
                
            } catch (error) {
                return handleServerFunctionError(error);
            }

        }
    );
