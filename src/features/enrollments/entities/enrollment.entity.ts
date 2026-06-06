export interface Enrollment {
    id: string;
    
    finalPrice: string;
    originalPrice: string;
    
    discountAmount: string;
    paymentMethod: string;
    
    enrolledAt: Date;
    
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