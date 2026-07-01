import apiClient from "#/shared/lib/api-client.server";
import { createServerFn } from "@tanstack/react-start";
import type { RequestFilterOptions } from "#/shared/types/filtered-pagination-options.interface";
import type { GetInstructorsResponse } from "../types/get-instructors-response.interface";
import { InstructorMapper } from "../mappers/instructor.mapper";

export const getInstructors = createServerFn({ method: "GET" })
    .inputValidator((input: RequestFilterOptions) => input)
    .handler(async ({ data: filters }) => {
        const { data } = await apiClient.get<GetInstructorsResponse>("/instructors", {
            params: filters,
        });

        const instructors = data.instructors.map(InstructorMapper.fromResponseToEntity);

        return {
            instructors,
            meta: data.meta,
        };
    });
