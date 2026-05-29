'use client';
import { StudentForm } from './student-form';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog';
import { useStudent } from '../hooks/use-student';

export const CreateStudentDialog = () => {

    const { createForm, handleCreate, isCreating } = useStudent();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>+ Nuevo estudiante</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registra un nuevo estudiante</DialogTitle>
                </DialogHeader>
                <StudentForm
                    form={createForm}
                    onSubmit={handleCreate}
                    isSubmitting={isCreating}
                    submitLabel="Crear estudiante"
                />
            </DialogContent>
        </Dialog >
    )
}
