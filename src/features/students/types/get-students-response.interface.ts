import type { PaginatedResponse } from "#/shared/types/pagination";

export interface StudentResponse {
    id:             string;
    name:           string;
    lastName:       string;
    email:          string;
    nationality:    string;
    documentType:   string | null;
    documentNumber: string | null;
    createdAt:      Date;
    updatedAt:      Date;
    phone:          string | null;
}


export type GetStudentsResponse = PaginatedResponse<StudentResponse, "students">
