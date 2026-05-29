import type { Course } from "../entities/course.entity";
import type { CourseResponse } from "../types/get-courses-response.interface";

export class CourseMapper {
    static fromResponseToEntity(response: CourseResponse): Course {
        return {
            id: response.id,
            title: response.title,
            summary: response.summary,
            overview: response.overview ?? "",
            startDate: new Date(response.startDate),
            modality: response.modality,
            level: response.level ?? "BEGINNER",
            coverImage: response.coverImage ?? "",
            currency: response.currency,
            isActive: response.isActive,
            price: Number(response.price),
            slug: response.slug,
            duration: response.duration,
            lessons: response.lessons,
            openRegistrations: response.openRegistrations,
            type: response.type,
            whatsappLink: response.whatsappLink ?? "",
            instructorId: response.instructorId ?? undefined,
            courseModules: response.courseModules ?? [
                {
                    title: "",
                    summary: "",
                    content: "",
                    order: 1,
                },
            ],
        };
    }
}
