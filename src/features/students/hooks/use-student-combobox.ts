import { useQuery } from "@tanstack/react-query"
import { getStudents } from "../server/get-students";

export const useStudentCombobox = (search: string | undefined) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["students-combobox", search],
        queryFn: async () => getStudents({ data: { search } }),
    })

    return {
        students: data?.students || [],
        isLoading,
        error,
    }
}