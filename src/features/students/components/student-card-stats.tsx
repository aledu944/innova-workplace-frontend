import { useQuery } from "@tanstack/react-query";
import { HugeiconsIcon } from '@hugeicons/react';
import { TrendingUpDownIcon, TrendingUp } from '@hugeicons/core-free-icons';

import { cn } from '#/shared/lib/utils';
import { getStudentStats } from '#/features/students/server/get-student-stats';

import { Badge } from '#/shared/components/ui/badge';
import { Card, CardContent } from '#/shared/components/ui/card';



export const StudentCardStats = () => {

    const { data, isPending, error } = useQuery({
        queryKey: ['students-stats'],
        queryFn: getStudentStats,
        staleTime: 1000 * 60 * 60, // 1 hora
    });


    if (isPending) {
        return (
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
                <li>
                    <Card className='animate-pulse py-17'>                            
                    </Card>
                </li>
            </ul>
        );
    }

    if (error) {
        return <p className='text-red-500'>Error al cargar las estadísticas de estudiantes.</p>;
    }

    return (
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
            <li>
                <Card className={cn(isPending && 'animate-pulse')}>
                    <CardContent>
                        <h2 className='uppercase font-bold text-muted-foreground'>Total estudiantes</h2>
                        <p className='text-3xl font-bold mb-2'>{data?.totalStudents}</p>
                        <Badge
                            variant={data.isIncrease ? 'success' : 'destructive'}
                        >
                            <HugeiconsIcon
                                icon={data.isIncrease ? TrendingUp : TrendingUpDownIcon}
                            />
                            {data.percentage}% {data.isIncrease ? 'aumento' : 'disminución'} en el último mes
                        </Badge>
                    </CardContent>
                </Card>
            </li>
        </ul>
    );
};
