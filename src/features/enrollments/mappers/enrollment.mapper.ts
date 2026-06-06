import type { Enrollment } from "../entities/enrollment.entity";
import type { EnrollmentResponse } from "../types/enrollment.interface";



export class EnrollmentMapper {
    
    static fromResponseToEntity(response: EnrollmentResponse): Enrollment {
        return {
            id: response.id,
            enrolledAt: new Date(response.enrolledAt),
            originalPrice: response.originalPrice,
            discountAmount: response.discountAmount,
            finalPrice: response.finalPrice,
            paymentMethod: response.paymentMethod,
            student: {
                id: response.student.id,
                email: response.student.email,
                name: response.student.name,
            },
            course: {
                id: response.course.id,
                title: response.course.title,
                slug: response.course.slug,
            },
            certificate: response.certificate ? {
                id: response.certificate.id,
            } : null,
        }
    }
    
}