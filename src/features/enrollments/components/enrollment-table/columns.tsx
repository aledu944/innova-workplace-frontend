import type { ColumnDef } from "@tanstack/react-table";
import type { Enrollment } from "../../entities/enrollment.entity";
import { Badge } from "@/shared/components/ui/badge";
import { formatDate, formatPaymentMethod } from "@/shared/helpers";
import { EnrollmentDropdownAcitons } from "./enrollment-dropdown-acitons";

export const columns: ColumnDef<Enrollment, any>[] = [
    {
        meta: {
            name: 'Estudiante'
        },
        header: 'Estudiante',
        cell: ({ row }) => {
            const enrollment = row.original;
            return (
                <div className="flex flex-col text-xs">
                    <span className="text-xs font-medium">
                        {enrollment.student.name}
                    </span>
                    <span className="text-muted-foreground">{enrollment.student.email} </span>
                </div>
            );
        }
    },
    {
        meta: {
            name: 'Curso inscrito'
        },
        accessorKey: "course.title",
        header: 'Curso inscrito',
        cell: ({ row }) => {
            const enrollment = row.original;

            return <div className="w-50 line-clamp-1 text-pretty">
                <p className="">
                    {enrollment.course.title}
                </p>
            </div>;
        }
    },
    {
        meta: {
            name: 'Metodo de pago'
        },
        accessorKey: "paymentMethod",
        header: 'Metodo de pago',
        cell: ({ row }) => {
            const enrollment = row.original;
            const isSuccessfulPayment = ['CARD', 'BANK_TRANSFER', 'STRIPE', 'PAYPAL', 'MERCADOPAGO'].includes(enrollment.paymentMethod);
            return (
                <Badge
                    variant={'secondary'}
                    className={isSuccessfulPayment ? 'badge-success' : 'badge-destructive'}
                >
                    {formatPaymentMethod(enrollment.paymentMethod)}
                </Badge>
            );
        }
    },
    {
        meta: {
            name: 'Certificado'
        },
        accessorKey: "certificate",
        header: 'Certificado',
        cell: ({ row }) => {
            const enrollment = row.original;
            return (
                <Badge
                    className={enrollment.certificate ? 'badge-success' : 'badge-destructive'}
                >
                    {enrollment.certificate ? 'Generado' : 'No generado'}
                </Badge>
            );
        }
    },
    {
        meta: {
            name: 'F. de inscripción'
        },
        accessorKey: "enrolledAt",
        header: 'F. de inscripción',
        cell: ({ row }) => {
            const enrollment = row.original;
            return formatDate(enrollment.enrolledAt);
        }
    },
    {
        meta: {
            name: 'Acciones'
        },
        id: "actions",
        cell: ({ row }) => {
            const enrollment = row.original;
            return <EnrollmentDropdownAcitons enrollment={enrollment} />;
        },
    },
];
