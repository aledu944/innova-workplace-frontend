"use client";

import type { BaseSyntheticEvent, ReactNode } from "react";
import { Controller, useFieldArray, type FieldArrayPath, type Path, type UseFormReturn } from "react-hook-form";
import { ImageIcon, PlusIcon, Trash2Icon, UploadIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor/nohighlight";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import type { CourseCreateInput, CourseUpdateInput } from "../schema";
import { getCourseDateTimeLocalValue } from "../hooks/use-course";
import {
    COURSE_LEVEL_LABELS,
    COURSE_LEVELS,
    COURSE_MODALITIES,
    COURSE_MODALITY_LABELS,
    COURSE_TYPES,
    COURSE_TYPE_LABELS,
} from "../constants";
import { InstructorCombobox } from "@/features/instructors/components/instructor-combobox";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Spinner } from "@/shared/components/ui/spinner";
import { Textarea } from "@/shared/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";

type CourseFormInput = CourseCreateInput | CourseUpdateInput;

interface Props<T extends CourseFormInput> {
    form: UseFormReturn<T, unknown, T>;
    onSubmit: (e?: BaseSyntheticEvent) => void;
    onUploadImage: (file: File, onImageUploaded: (url: string) => void) => void;
    isSubmitting?: boolean;
    isUploadingImage?: boolean;
    submitLabel?: string;
}

interface CourseFormSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
}

const requiredMark = <span className="text-destructive">*</span>;

const DEFAULT_MODULE = {
    title: "",
    summary: "",
    content: "",
    order: 1,
};

const getTextValue = (value: unknown) => (typeof value === "string" ? value : "");

const getNumberValue = (value: unknown) => (typeof value === "number" && !Number.isNaN(value) ? value : "");

const getDateTimeValue = (value: unknown) => {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return getCourseDateTimeLocalValue(value);
    }

    if (typeof value === "string" && value) {
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? "" : getCourseDateTimeLocalValue(date);
    }

    return "";
};

const CourseFormSection = ({ title, description, children }: CourseFormSectionProps) => (
    <section className="rounded-lg border bg-card/60 p-5 shadow-sm">
        <div className="mb-5">
            <h2 className="text-base font-semibold">{title}</h2>
            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {children}
    </section>
);

export function CourseForm<T extends CourseFormInput>({
    form,
    onSubmit,
    onUploadImage,
    isSubmitting = false,
    isUploadingImage = false,
    submitLabel = "Guardar",
}: Props<T>) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "courseModules" as FieldArrayPath<T>,
    });

    const coverImage = (form.watch("coverImage" as Path<T>) as string) || "";

    return (
        <form onSubmit={onSubmit} className="space-y-6 pb-10">
            <CourseFormSection title="Información principal" description="Datos visibles en el catálogo y en el detalle del curso.">
                <div className="grid gap-5 lg:grid-cols-2">
                    <Controller
                        name={"title" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Título {requiredMark}</FieldLabel>
                                <Input {...field} value={getTextValue(field.value)} id={field.name} placeholder="Nombre del curso" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"type" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Tipo {requiredMark}</FieldLabel>
                                <Select onValueChange={field.onChange} value={getTextValue(field.value)}>
                                    <SelectTrigger id={field.name} className="w-full">
                                        <SelectValue placeholder="Selecciona tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COURSE_TYPES.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {COURSE_TYPE_LABELS[type]}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"summary" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="lg:col-span-2">
                                <FieldLabel htmlFor={field.name}>Resumen {requiredMark}</FieldLabel>
                                <Textarea {...field} value={getTextValue(field.value)} id={field.name} placeholder="Descripción corta del curso" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
            </CourseFormSection>

            <CourseFormSection title="Contenido comercial" description="Texto largo para presentar objetivos, temario y beneficios.">
                <Controller
                    name={"overview" as Path<T>}
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Overview {requiredMark}</FieldLabel>
                            <div data-color-mode="dark">
                                <MDEditor
                                    value={getTextValue(field.value)}
                                    onChange={(value) => field.onChange(value ?? "")}
                                    className="course-md-editor"
                                    height={320}
                                    preview="live"
                                    textareaProps={{
                                        id: field.name,
                                        placeholder: "Detalle comercial y temario general",
                                    }}
                                />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </CourseFormSection>

            <CourseFormSection title="Precio y programación" description="Configura costos, fechas y características académicas.">
                <div className="grid gap-5 lg:grid-cols-4">
                    <Controller
                        name={"price" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Precio {requiredMark}</FieldLabel>
                                <Input
                                    id={field.name}
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    value={getNumberValue(field.value)}
                                    onChange={(event) => field.onChange(event.target.value === "" ? "" : event.target.valueAsNumber)}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"currency" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Moneda {requiredMark}</FieldLabel>
                                <Select onValueChange={field.onChange} value={getTextValue(field.value)}>
                                    <SelectTrigger id={field.name} className="w-full">
                                        <SelectValue placeholder="Selecciona moneda" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="BOB">BOB</SelectItem>
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"startDate" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="lg:col-span-2">
                                <FieldLabel htmlFor={field.name}>Fecha de inicio {requiredMark}</FieldLabel>
                                <Input
                                    id={field.name}
                                    type="datetime-local"
                                    value={getDateTimeValue(field.value)}
                                    onChange={(event) => field.onChange(event.target.value ? new Date(event.target.value) : "")}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"duration" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Duración {requiredMark}</FieldLabel>
                                <Input {...field} value={getTextValue(field.value)} id={field.name} placeholder="4 semanas" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"lessons" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Lecciones {requiredMark}</FieldLabel>
                                <Input
                                    id={field.name}
                                    type="number"
                                    min={1}
                                    value={getNumberValue(field.value)}
                                    onChange={(event) => field.onChange(event.target.value === "" ? "" : event.target.valueAsNumber)}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"modality" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Modalidad {requiredMark}</FieldLabel>
                                <Select onValueChange={field.onChange} value={getTextValue(field.value)}>
                                    <SelectTrigger id={field.name} className="w-full">
                                        <SelectValue placeholder="Selecciona modalidad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COURSE_MODALITIES.map((modality) => (
                                            <SelectItem key={modality} value={modality}>
                                                {COURSE_MODALITY_LABELS[modality]}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"level" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Nivel {requiredMark}</FieldLabel>
                                <Select onValueChange={field.onChange} value={getTextValue(field.value)}>
                                    <SelectTrigger id={field.name} className="w-full">
                                        <SelectValue placeholder="Selecciona nivel" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COURSE_LEVELS.map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {COURSE_LEVEL_LABELS[level]}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
            </CourseFormSection>

            <CourseFormSection title="Publicación e instructor" description="Estado del curso, enlace de contacto e instructor asignado.">
                <div className="grid gap-5 lg:grid-cols-2">
                    <Controller
                        name={"isActive" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Estado</FieldLabel>
                                <Select onValueChange={(value) => field.onChange(value === "true")} value={String(field.value)}>
                                    <SelectTrigger id={field.name} className="w-full">
                                        <SelectValue placeholder="Estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Activo</SelectItem>
                                        <SelectItem value="false">Inactivo</SelectItem>
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"openRegistrations" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Inscripciones</FieldLabel>
                                <Select onValueChange={(value) => field.onChange(value === "true")} value={String(field.value)}>
                                    <SelectTrigger id={field.name} className="w-full">
                                        <SelectValue placeholder="Inscripciones" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Abiertas</SelectItem>
                                        <SelectItem value="false">Cerradas</SelectItem>
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"whatsappLink" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>WhatsApp</FieldLabel>
                                <Input {...field} value={getTextValue(field.value)} id={field.name} placeholder="https://wa.me/..." />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name={"instructorId" as Path<T>}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <InstructorCombobox
                                    value={getTextValue(field.value)}
                                    onValueChange={field.onChange}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
            </CourseFormSection>

            <CourseFormSection title="Imagen del curso" description="URL o subida de la portada que se mostrará en el catálogo.">
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="grid content-start gap-4">
                        <Controller
                            name={"coverImage" as Path<T>}
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Imagen del curso</FieldLabel>
                                    <Input {...field} value={getTextValue(field.value)} id={field.name} placeholder="https://..." />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <div className="flex flex-wrap items-center gap-3">
                            <Button type="button" variant="outline" disabled={isUploadingImage} asChild>
                                <label>
                                    {isUploadingImage ? <Spinner className="size-4" /> : <UploadIcon className="size-4" />}
                                    Subir imagen
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            if (!file) return;

                                            onUploadImage(file, (url) => form.setValue("coverImage" as Path<T>, url as any, { shouldValidate: true }));
                                            event.target.value = "";
                                        }}
                                    />
                                </label>
                            </Button>
                        </div>
                    </div>

                    <div className="aspect-video overflow-hidden rounded-md border bg-muted">
                        {coverImage ? (
                            <img src={coverImage} alt="Cover del curso" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                <ImageIcon className="size-8" />
                            </div>
                        )}
                    </div>
                </div>
            </CourseFormSection>

            <CourseFormSection title="Módulos" description="Contenido principal y orden de cada módulo del curso.">
                <div className="mb-4 flex items-center justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ ...DEFAULT_MODULE, order: fields.length + 1 } as never)}
                    >
                        <PlusIcon className="size-4" />
                        Módulo
                    </Button>
                </div>

                <div className="space-y-4">
                    {fields.map((module, index) => (
                        <div key={module.id} className="rounded-lg border bg-background/40 p-4">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <span className="text-sm font-medium">Módulo {index + 1}</span>
                                <Button type="button" variant="ghost" size="icon-sm" disabled={fields.length === 1} onClick={() => remove(index)}>
                                    <Trash2Icon className="size-4" />
                                </Button>
                            </div>
                            <div className="grid gap-4 lg:grid-cols-[1fr_120px]">
                                <Controller
                                    name={`courseModules.${index}.title` as Path<T>}
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Título {requiredMark}</FieldLabel>
                                            <Input {...field} value={getTextValue(field.value)} id={field.name} placeholder="Introducción" />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name={`courseModules.${index}.order` as Path<T>}
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Orden</FieldLabel>
                                            <Input
                                                id={field.name}
                                                type="number"
                                                min={1}
                                                value={getNumberValue(field.value)}
                                                onChange={(event) => field.onChange(event.target.value === "" ? "" : event.target.valueAsNumber)}
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name={`courseModules.${index}.summary` as Path<T>}
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid} className="lg:col-span-2">
                                            <FieldLabel htmlFor={field.name}>Resumen {requiredMark}</FieldLabel>
                                            <Textarea {...field} value={getTextValue(field.value)} id={field.name} placeholder="Qué se aprende en este módulo" />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name={`courseModules.${index}.content` as Path<T>}
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid} className="lg:col-span-2">
                                            <FieldLabel htmlFor={field.name}>Contenido {requiredMark}</FieldLabel>
                                            <Textarea {...field} value={getTextValue(field.value)} id={field.name} placeholder="Temas, clases o recursos" className="min-h-24" />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CourseFormSection>

            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting || isUploadingImage} className="w-full lg:w-fit">
                    {isSubmitting ? (
                        <>
                            <Spinner className="size-5" />
                            Cargando...
                        </>
                    ) : (
                        submitLabel
                    )}
                </Button>
            </div>
        </form>
    );
}
