export interface EnrollmentResponse {
    id: string;
    enrolledAt: Date;
    originalPrice: string;
    discountAmount: string;
    finalPrice: string;
    paymentMethod: string;
    createdAt: Date;
    student: {
        id: string;
        email: string;
        name: string;
    };
    course: {
        id: string;
        title: string;
        slug: string;
    };
    certificate: {
        id: string;
    } | null;
}