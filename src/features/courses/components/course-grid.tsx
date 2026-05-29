"use client";

import { BookOpenIcon, CalendarIcon, ClockIcon, ImageIcon, MonitorPlayIcon, UsersIcon } from "lucide-react";

import type { Course } from "../entities/course.entity";
import { CreateCourseDialog } from "./create-course-dialog";
import { EditCourseDialog } from "./edit-course-dialog";
import { COURSE_LEVEL_LABELS, COURSE_MODALITY_LABELS, COURSE_TYPE_LABELS } from "../constants";

import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { DataTableSearchInput } from "@/shared/components/data-table/data-table-search-input";
import { DataTableStatusFilter } from "@/shared/components/data-table/data-table-status-filter";
import { PaginationButtons } from "@/shared/components/data-table/pagination-buttons";
import { formatDate } from "@/shared/helpers";
import type { PaginationMeta } from "@/shared/types/pagination";

interface Props {
    courses: Course[];
    meta: PaginationMeta;
    isPending: boolean;
}

const formatPrice = (course: Course) =>
    new Intl.NumberFormat("es-BO", {
        style: "currency",
        currency: course.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(course.price);

export const CourseGrid = ({ courses, isPending, meta }: Props) => {
    return (
        <Card>
            <CardContent className="space-y-6">
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-lg font-semibold">Cursos publicados</h2>
                        <p className="text-sm text-muted-foreground">{meta.total} cursos registrados</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 justify-between">
                        <DataTableSearchInput placeholder="Buscar curso" />
                        <CreateCourseDialog />
                    </div>
                </div>

                {isPending ? (
                    <div className="rounded-lg border py-16 text-center text-sm text-muted-foreground">Cargando cursos...</div>
                ) : courses.length ? (
                    <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                        {courses.map((course) => (
                            <article key={course.id} className="group flex min-h-full flex-col overflow-hidden rounded-lg border bg-background shadow-sm transition-colors hover:border-primary/50">
                                <div className="aspect-video overflow-hidden bg-muted">
                                    {course.coverImage ? (
                                        <img
                                            src={course.coverImage}
                                            alt={course.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                            <ImageIcon className="size-10" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col gap-4 p-5">
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant={course.isActive ? "success" : "destructive"}>
                                            {course.isActive ? "Activo" : "Inactivo"}
                                        </Badge>
                                        <Badge variant={course.openRegistrations ? "default" : "secondary"}>
                                            {course.openRegistrations ? "Inscripciones abiertas" : "Inscripciones cerradas"}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="line-clamp-2 text-lg font-semibold leading-tight">{course.title}</h3>
                                        <p className="line-clamp-2 text-sm text-muted-foreground">{course.summary}</p>
                                    </div>

                                    <div className="grid gap-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="size-4 text-primary" />
                                            <span>{formatDate(course.startDate)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="size-4 text-primary" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BookOpenIcon className="size-4 text-primary" />
                                            <span>{course.lessons} lecciones</span>
                                        </div>
                                    </div>
                                </div>

                                <CardFooter className="mt-auto justify-between gap-3 border-t p-5">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Precio</p>
                                        <p className="text-lg font-bold">{formatPrice(course)}</p>
                                    </div>
                                    <EditCourseDialog course={course} />
                                </CardFooter>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border py-16 text-center">
                        <UsersIcon className="size-8 text-muted-foreground" />
                        <div>
                            <p className="font-medium">No hay cursos para mostrar</p>
                            <p className="text-sm text-muted-foreground">Crea un curso o ajusta los filtros actuales.</p>
                        </div>
                    </div>
                )}
            </CardContent>

            {meta.lastPage > 1 && (
                <CardFooter className="justify-end border-t">
                    <PaginationButtons page={meta.page} totalPages={meta.lastPage} />
                </CardFooter>
            )}
        </Card>
    );
};
