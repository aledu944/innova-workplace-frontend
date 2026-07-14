import { Controller } from "react-hook-form";

import { useEnrollment } from "../hooks/use-enrollment";
import { PaymentMethod } from "../types/payment-methods.enum";

import { StudentCombobox } from "@/features/students/components/student-combobox";
import { CourseCombobox } from "@/features/courses/components/course-combobox";

import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import { formatPaymentMethod } from "@/shared/helpers";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

const PAYMENT_METHOD_OPTIONS = Object.values(PaymentMethod);

export const CreateEnrollmentDialog = () => {

    const { createForm, handleCreate, isCreating, isOpenModal, onOpenModalChange } = useEnrollment();

    return (
        <Dialog open={isOpenModal} onOpenChange={onOpenModalChange}>
            <DialogTrigger asChild>
                <Button>+ Nueva inscripción</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear inscripción</DialogTitle>
                    <DialogDescription>
                        Inscribe a un estudiante en un curso y registra el método de pago utilizado.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreate} className="flex flex-col gap-6">
                    <Controller
                        name="studentId"
                        control={createForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <StudentCombobox onValueChange={(student) => field.onChange(student.id)} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="courseId"
                        control={createForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <CourseCombobox onValueChange={(course) => field.onChange(course.id)} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="paymentMethod"
                        control={createForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Método de pago <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger id={field.name} className="w-full">
                                        <SelectValue placeholder="Selecciona un método de pago" />
                                    </SelectTrigger>
                                    <SelectContent className="select-content">
                                        {PAYMENT_METHOD_OPTIONS.map((method) => (
                                            <SelectItem key={method} value={method} className="select-item">
                                                {formatPaymentMethod(method)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isCreating} className="w-full lg:w-fit">
                            {isCreating ? (
                                <>
                                    <Spinner className="size-5" />
                                    <span>Creando...</span>
                                </>
                            ) : (
                                <span>Crear inscripción</span>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
