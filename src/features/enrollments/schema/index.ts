import z from "zod";
import { PaymentMethod } from "../types/payment-methods.enum";

export const enrollmentCreateSchema = z.object({
    studentId: z.string().min(1, { message: "Selecciona un estudiante" }),
    courseId: z.string().min(1, { message: "Selecciona un curso" }),
    paymentMethod: z.enum(PaymentMethod, { message: "Selecciona un método de pago" }),
});

export type EnrollmentCreateInput = z.infer<typeof enrollmentCreateSchema>;