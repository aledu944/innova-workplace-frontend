import apiClient from "@/shared/lib/api-client";
import { createServerFn } from "@tanstack/react-start";
import { courseUpdateSchema } from "../schema";
import { handleServerFunctionError } from "@/shared/helpers";

export const updateCourse = createServerFn({ method: "POST" })
    .inputValidator(courseUpdateSchema)
    .handler(async ({ data: course }) => {
        const { id, instructorId, ...courseValues } = course;

        try {
            const { data } = await apiClient.patch<{ message: string }>(`/courses/${id}`, {
                ...courseValues,
                instructorId: instructorId || undefined,
            });

            return {
                data,
                error: null,
            };
        } catch (error) {
            return handleServerFunctionError(error);
        }
    });
