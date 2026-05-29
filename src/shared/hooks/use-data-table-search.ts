import { getRouteApi, useNavigate } from '@tanstack/react-router';

const adminRouteApi = getRouteApi('/admin');

type StatusValue = 'all' | 'true' | 'false';

export const useDataTableSearch = () => {
    const {
        page,
        limit,
        search,
        isActive,
    } = adminRouteApi.useSearch();

    const navigate = useNavigate();

    const setSearch = (value: string) => {
        navigate({
            to: '.',
            replace: true,
            search: (prev) => ({
                ...prev,
                page: 1,
                search: value || undefined,
            }),
        });
    };

    const setStatus = (value: StatusValue) => {
        navigate({
            to: '.',
            replace: true,
            search: (prev) => ({
                ...prev,
                page: 1,
                isActive: value === 'all' ? undefined : value,
            }),
        });
    };

    const setPage = (value: number) => {
        navigate({
            to: '.',
            search: (prev) => ({
                ...prev,
                page: value,
            }),
        });
    };

    const setLimit = (value: number) => {
        navigate({
            to: '.',
            replace: true,
            search: (prev) => ({
                ...prev,
                page: 1,
                limit: value,
            }),
        });
    };

    return {
        page,
        limit,
        search,
        isActive,
        setSearch,
        setStatus,
        setPage,
        setLimit,
    };
};