import { MoreHorizontal } from 'lucide-react'
import type { Enrollment } from '../../entities/enrollment.entity';
import { Button } from '@/shared/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import { useCreateCertificate } from '../../hooks/use-create-certificate';
import { useDownloadCertificate } from '../../hooks/use-download-certificate';

interface Props {
    enrollment: Enrollment;
}

export const EnrollmentDropdownAcitons = ({ enrollment }: Props) => {

    const { handleCreateCertificate, isPending } = useCreateCertificate(enrollment);
    const { handleDownloadCertificate, isPending: isDownloading } = useDownloadCertificate(enrollment);

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
                            <>
                                <DropdownMenuItem asChild>
                                    <a href={`https://www.innova-code.dev/estudiantes/certificates/${enrollment.certificate.id}`} target="_blank" rel="noopener noreferrer">
                                        Ver certificado
                                    </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDownloadCertificate} disabled={isDownloading}>
                                    Descargar certificado
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <DropdownMenuItem onClick={handleCreateCertificate} disabled={isPending}>
                                Generar certificado
                            </DropdownMenuItem>
                        )
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
