import z from "zod";
import { PaymentMethod } from "../types/payment-methods.enum";

export const enrollmentCreateSchema = z.object({
    studentId: z.string(),
    courseId: z.string(),
    paymentMethod: z.enum(PaymentMethod),
});

export type EnrollmentCreateInput = z.infer<typeof enrollmentCreateSchema>;