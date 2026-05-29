// src/types/pagination.ts

export interface PaginationMeta {
    total: number;
    page: number;
    lastPage: number;
}

export type PaginatedResponse<T, K extends string> = {
    meta: PaginationMeta;
} & {
    [P in K]: T[];
};
