import type { CourseLevel, CourseModality, CourseType } from "../entities/course.entity";
import type { PaginatedResponse } from "#/shared/types/pagination";

export interface CourseModuleResponse {
    title: string;
    summary: string;
    content: string;
    order: number;
}

export interface CourseResponse {
    id: string;
    title: string;
    summary: string;
    overview?: string | null;
    startDate: string | Date;
    modality: CourseModality;
    level?: CourseLevel | null;
    coverImage: string | null;
    currency: string;
    isActive: boolean;
    price: string;
    slug: string;
    duration: string;
    lessons: number;
    openRegistrations: boolean;
    type: CourseType;
    whatsappLink?: string | null;
    instructorId?: string | null;
    courseModules?: CourseModuleResponse[] | null;
}

export type GetCoursesResponse = PaginatedResponse<CourseResponse, "courses">;
