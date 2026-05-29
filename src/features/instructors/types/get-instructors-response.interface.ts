import type { PaginatedResponse } from "#/shared/types/pagination";

export interface InstructorResponse {
    id: string;
    name: string;
    lastName: string;
    email: string;
    photo: string | null;
    specialty: string;
    isActive: boolean;
    createdAt: string | Date;
}

export type GetInstructorsResponse = PaginatedResponse<InstructorResponse, "instructors">;
