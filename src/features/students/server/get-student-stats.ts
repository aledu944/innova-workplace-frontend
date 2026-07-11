import apiClient from "@/shared/lib/api-client";
import { createServerFn } from "@tanstack/react-start";
import type { GetStudentStats } from "../types/get-student-stats-response.interface";



export const getStudentStats = createServerFn({ method: 'GET' })
    .handler(async () => {
        const { data } = await apiClient.get<GetStudentStats>('/students/stats');
        return data;
    }); 