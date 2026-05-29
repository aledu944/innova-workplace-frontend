
import { createServerFn } from "@tanstack/react-start";
import { studentUpdateSchema } from "../schema";
import apiClient from "@/shared/lib/api-client";

export const updateStudent = createServerFn({ method: "POST" })
    .inputValidator(studentUpdateSchema)
    .handler(
        async ({ data: student }) => {

            const { id, ...studentValues } = student;

            try {
                const { data } = await apiClient.patch(`/students/${id}`, studentValues);

                return {
                    data,
                    error: null
                };

            } catch (error) {
                return {
                    data: null,
                    error: "Error al actualizar el estudiante"
                };
            }
        }
    );