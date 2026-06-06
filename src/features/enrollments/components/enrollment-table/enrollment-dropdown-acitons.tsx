'use client'

import { MoreHorizontal } from 'lucide-react'
import type { Enrollment } from '../../entities/enrollment.entity';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';

interface Props {
    enrollment: Enrollment;
}

export const EnrollmentDropdownAcitons = ({ enrollment }: Props) => {

    // const { handleCreateCertificate, isPending } = useCreateCertificate();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {
                        enrollment.certificate ? (
                            <DropdownMenuItem asChild>
                                <a href={`https://www.innova-code.dev/estudiantes/certificates/${enrollment.certificate.id}`} target="_blank" rel="noopener noreferrer">
                                    Ver certificado
                                </a>
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem onClick={() => {}} disabled={true}>
                            {/* <DropdownMenuItem onClick={() => handleCreateCertificate(enrollment)} disabled={isPending}> */}
                                Generar certificado
                            </DropdownMenuItem>
                        )
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
