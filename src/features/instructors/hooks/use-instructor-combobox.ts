"use client";

import { useQuery } from "@tanstack/react-query";
import { getInstructors } from "../server/get-instructors";

export const useInstructorCombobox = (search: string | undefined) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["instructors-combobox", search],
        queryFn: () =>
            getInstructors({
                data: {
                    search: search ?? "",
                    limit: 50,
                },
            }),
    });

    return {
        instructors: data?.instructors ?? [],
        isLoading,
        error,
    };
};
