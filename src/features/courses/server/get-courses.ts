import apiClient from "#/shared/lib/api-client.server";
import { createServerFn } from "@tanstack/react-start";
import type { RequestFilterOptions } from "#/shared/types/filtered-pagination-options.interface";
import type { GetCoursesResponse } from "../types/get-courses-response.interface";
import { CourseMapper } from "../mappers/course.mapper";

export const getCourses = createServerFn({ method: "GET" })
    .inputValidator((input: RequestFilterOptions) => input)
    .handler(async ({ data: filters }) => {
        const { data } = await apiClient.get<GetCoursesResponse>("/courses", {
            params: filters,
        });

        const courses = data.courses.map(CourseMapper.fromResponseToEntity);

        return {
            courses,
            meta: data.meta,
        };
    });
