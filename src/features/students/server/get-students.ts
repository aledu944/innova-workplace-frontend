import apiClient from "#/shared/lib/api-client";
import { createServerFn } from "@tanstack/react-start";
import type { GetStudentsResponse } from "../types/get-students-response.interface";
import { StudentMapper } from "../mappers/student.mapper";
import type { RequestFilterOptions } from "#/shared/types/filtered-pagination-options.interface";



export const getStudents = createServerFn({ method: "GET" })
    .inputValidator((input: RequestFilterOptions) => input)
    .handler(async ({ data: filters }) => {
        
        const { data } = await apiClient.get<GetStudentsResponse>("/students", {
            params: filters,
        });

        const students = data.students.map(StudentMapper.fromResponseToEntity);

        return {
            students,
            meta: data.meta,
        };
    });