import { useQuery } from "@tanstack/react-query"
import { getCourses } from "../server/get-courses";

export const useCourseCombobox = (search: string | undefined) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["course-combobox", search],
        queryFn: async () => getCourses({ data: { search } }),
    })

    return {
        courses: data?.courses || [],
        isLoading,
        error,
    }
}