import { useQuery } from "@tanstack/react-query";

import { getCountries } from "@/shared/server/get-countries";

export const useCountries = () => {

    const { data, isPending } = useQuery({
        queryKey: ['countries'],
        queryFn: getCountries,
        staleTime: Infinity,
    });

    return {
        countries: data || [],
        isPending,
    };
};
