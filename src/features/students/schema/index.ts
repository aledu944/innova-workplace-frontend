import { z } from "zod";

export const studentCreateSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }),
    lastName: z.string().min(1, { message: "Los apellidos son obligatorios" }),
    email: z.string().email({ message: "El correo no es válido" }),
    nationality: z.string().min(1, { message: "La nacionalidad es obligatoria" }),
    documentType: z.string().optional(),
    documentNumber: z.string().optional(),
    phone: z.string().optional(),
});

export const studentUpdateSchema = studentCreateSchema.extend({
    id: z.string().optional(),
});

export type StudentCreateInput = z.infer<typeof studentCreateSchema>;
export type StudentUpdateInput = z.infer<typeof studentUpdateSchema>;