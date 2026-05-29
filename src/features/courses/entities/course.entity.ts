import type { COURSE_LEVELS, COURSE_MODALITIES, COURSE_TYPES } from "../constants";

export type CourseModality = (typeof COURSE_MODALITIES)[number];
export type CourseLevel = (typeof COURSE_LEVELS)[number];
export type CourseType = (typeof COURSE_TYPES)[number];

export interface CourseModule {
    title: string;
    summary: string;
    content: string;
    order: number;
}

export interface Course {
    id: string;
    title: string;
    summary: string;
    overview: string;
    startDate: Date;
    modality: CourseModality;
    level: CourseLevel;
    coverImage: string;
    currency: string;
    isActive: boolean;
    price: number;
    slug: string;
    duration: string;
    lessons: number;
    openRegistrations: boolean;
    type: CourseType;
    whatsappLink: string;
    instructorId?: string;
    courseModules: CourseModule[];
}
