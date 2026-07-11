import apiClient from "@/shared/lib/api-client";
import { createServerFn } from "@tanstack/react-start";
import { courseCreateSchema } from "../schema";

export const createCourse = createServerFn({ method: "POST" })
    .inputValidator(courseCreateSchema)
    .handler(async ({ data: course }) => {
        try {
            const { instructorId, ...courseValues } = course;
            const { data } = await apiClient.post<{ message: string }>("/courses", {
                ...courseValues,
                instructorId: instructorId || undefined,
            });

            return {
                data,
                error: null,
            };
        } catch (error) {
            return {
                data: null,
                error: "Error al crear el curso",
            };
        }
    });
