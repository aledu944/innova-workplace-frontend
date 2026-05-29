import { z } from "zod";
import { COURSE_LEVELS, COURSE_MODALITIES, COURSE_TYPES } from "../constants";

export const courseModuleSchema = z.object({
    title: z.string().min(1, "El título del módulo es requerido"),
    summary: z.string().min(1, "El resumen del módulo es requerido"),
    content: z.string().min(1, "El contenido del módulo es requerido"),
    order: z.coerce.number().min(1, "El orden debe ser al menos 1"),
});

export const courseCreateSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    price: z.coerce.number().min(0, "El precio debe ser mayor o igual a 0"),
    currency: z.string().min(1, "La moneda es requerida"),
    summary: z.string().min(1, "El resumen es requerido"),
    overview: z.string().min(1, "El overview es requerido"),
    startDate: z.coerce.date({ error: "La fecha de inicio es requerida" }),
    lessons: z.coerce.number().min(1, "Debe tener al menos 1 lección"),
    modality: z.enum(COURSE_MODALITIES, { error: "La modalidad es requerida" }),
    level: z.enum(COURSE_LEVELS, { error: "El nivel es requerido" }),
    duration: z.string().min(1, "La duración es requerida"),
    coverImage: z.string().url("Debe ser una URL válida").or(z.literal("")),
    whatsappLink: z.string().url("Debe ser una URL válida").or(z.literal("")),
    instructorId: z.string().uuid("Instructor inválido").optional().or(z.literal("")),
    isActive: z.boolean(),
    openRegistrations: z.boolean(),
    type: z.enum(COURSE_TYPES, { error: "El tipo de curso es requerido" }),
    courseModules: z.array(courseModuleSchema).min(1, "Debe tener al menos un módulo"),
});

export const courseUpdateSchema = courseCreateSchema.extend({
    id: z.string().uuid("Curso inválido"),
});

export const courseSchema = courseCreateSchema;

export type CourseModuleInput = z.infer<typeof courseModuleSchema>;
export type CourseCreateInput = z.infer<typeof courseCreateSchema>;
export type CourseUpdateInput = z.infer<typeof courseUpdateSchema>;
export type CourseFormValues = CourseCreateInput;
