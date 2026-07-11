import apiClient from "@/shared/lib/api-client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { CourseMapper } from "../mappers/course.mapper";
import type { CourseResponse } from "../types/get-courses-response.interface";

interface GetCourseResponse {
    course?: CourseResponse;
}

const isCourseResponse = (value: CourseResponse | GetCourseResponse | undefined): value is CourseResponse =>
    typeof value === "object" && value !== null && "id" in value;

export const getCourse = createServerFn({ method: "GET" })
    .inputValidator(z.object({ slug: z.string().min(1, "Curso inválido") }))
    .handler(async ({ data: { slug } }) => {
        const { data } = await apiClient.get<CourseResponse | GetCourseResponse>(`/courses/${slug}`);
        const courseResponse = "course" in data ? data.course : data;

        if (!isCourseResponse(courseResponse)) {
            throw new Error("Curso no encontrado");
        }

        return {
            course: CourseMapper.fromResponseToEntity(courseResponse),
        };
    });
