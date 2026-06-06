import z from "zod";



export const createEnrollmentSchema = z.object({
    courseId: z.string(),
    paymentMethod: z.enum(['credit_card', 'paypal', 'bank_transfer']),
    discountCode: z.string().optional(),
});

export type CreateEnrollmentDTO = z.infer<typeof createEnrollmentSchema>;