"use client";
import { type ColumnDef } from "@tanstack/react-table";

import type { Student } from "../../entities/student.entity";
import { formatDate } from "#/shared/helpers";

export const columns: ColumnDef<Student, any>[] = [
    {
        meta: {
            name: 'Nombre'
        },
        accessorKey: "name",
        header: 'Nombre',
        cell: ({ row }) => {
            const student = row.original;
            return (
                <div className="flex flex-col">
                    <span>{student.name}</span>
                    <span className="text-muted-foreground">{student.lastName}</span>
                </div>
            );
        }
    },
    {
        meta: {
            name: 'Contacto'
        },
        header: 'Contacto',
        cell: ({ row }) => {
            const student = row.original;
            return (
                <div className="flex flex-col">
                    <span>{student.email}</span>
                    <span className="text-muted-foreground">{student.phone}</span>
                </div>
            );
        }
    },
    {
        meta: {
            name: 'Nacionalidad'
        },
        accessorKey: "nationality",
        header: 'Nacionalidad',
        cell: ({ row }) => {
            const student = row.original;
            return (
                <div className="flex items-center gap-2 ">
                    <span className="text-lg">
                        {student.nationality === "Bolivia" ? "🇧🇴" : "🌎"}
                        </span>
                    <span>{student.nationality}</span>
                </div>
            );
        }
    },
    {
        meta: {
            name: 'F. de creación'
        },
        accessorKey: "enrolledAt",
        header: 'F. de creación',
        cell: ({ row }) => {
            const enrollment = row.original;
            return formatDate(new Date(enrollment.createdAt));
        }
    },
    {
        meta: {
            name: 'F. de actualización'
        },
        accessorKey: "updatedAt",
        header: 'F. de actualización',
        cell: ({ row }) => {
            const enrollment = row.original;
            return formatDate(new Date(enrollment.updatedAt));
        }
    }
    // {
    //     meta: {
    //         name: 'Acciones'
    //     },
    //     accessorKey: "actions",
    //     header: 'Acciones',
    //     cell: ({ row }) => {
    //         const student = row.original
    //         return <DropDownActions student={student} />
    //     }
    // }

];
