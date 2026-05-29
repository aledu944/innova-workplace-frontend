"use client";
import { useState } from 'react';
import { Pagination, PaginationContent, PaginationItem } from '../ui/pagination';
import { Button } from '../ui/button';
import { useNavigate, useSearch } from '@tanstack/react-router';


interface Props {
    page?: number;
    totalPages?: number;
}

export const PaginationButtons = ({ page = 1, totalPages }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const { isActive } = useSearch({ strict: false }) as any;
    const navigate = useNavigate();

    const handleChange = (newPage: number) => {
        navigate({
            to: '.',
            replace: true,
            search: (prev) => ({
                ...prev,
                page: newPage,
            }),
        });
    };

    // const handleChangePage = (newPage: number) => {
    //     setIsLoading(true);

    //     const updatedSearchParams = new URLSearchParams(searchParams.toString());
    //     updatedSearchParams.set('page', newPage.toString());

    //     const newPath = `${pathname}?${updatedSearchParams.toString()}`;

    //     router.push(newPath);

    //     setIsLoading(false);
    // };

    return (
        <div className="py-2 px-2 flex justify-between items-center">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <Button
                            variant='outline'
                            disabled={page === 1 || isLoading}
                            onClick={(e) => {
                                e.preventDefault();
                                if (page > 1) {
                                    handleChange(page - 1);
                                }
                            }}
                        >
                            Anterior
                        </Button>

                    </PaginationItem>

                    {
                        Array.from({ length: totalPages || 0 }, (_, i) => i + 1).map((pageNumber) => (
                            <PaginationItem key={pageNumber}>
                                <Button
                                    variant={pageNumber === page ? 'outline' : 'ghost'}
                                    size="sm"
                                    disabled={isLoading}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleChange(pageNumber);
                                    }}
                                >
                                    {pageNumber}
                                </Button>
                            </PaginationItem>
                        ))
                    }
                    <PaginationItem>
                        <Button
                            variant='outline'
                            disabled={totalPages ? page === totalPages || isLoading : true}
                            onClick={(e) => {
                                e.preventDefault();
                                if (totalPages && page < totalPages) {
                                    handleChange(page + 1);
                                }
                            }}
                        >
                            Siguiente
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
