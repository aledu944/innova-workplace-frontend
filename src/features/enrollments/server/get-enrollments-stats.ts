'use server';
import { createServerFn } from "@tanstack/react-start";
import type { GetEnrollmentsStatsResponse } from "../types/get-enrollments-stats-response.interface";
import apiClient from "@/shared/lib/api-client.server";

export const getEnrollmentsStats = createServerFn()
    .handler(
        async () => {
            const { data } = await apiClient.get<GetEnrollmentsStatsResponse>("/enrollments/stats");

            return {
                data,
                error: null
            };
        }
    );