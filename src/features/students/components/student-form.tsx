import { Controller, type UseFormReturn } from 'react-hook-form';

import type { StudentUpdateInput } from '../schema';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Spinner } from '@/shared/components/ui/spinner';
import { useCountries } from '@/shared/hooks/use-countries';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/shared/components/ui/select';


interface Props {
    form: UseFormReturn<StudentUpdateInput>;
    onSubmit: (e?: React.BaseSyntheticEvent) => void;
    isSubmitting?: boolean;
    submitLabel?: string;
}

export const StudentForm = ({ form, onSubmit, isSubmitting = false, submitLabel = 'Guardar' }: Props) => {

    const { countries, isPending } = useCountries();

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Nombre <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Nombre del estudiante"
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Apellidos <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Apellidos del estudiante"
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Correo <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="correo@ejemplo.com"
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="documentType"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Tipo de documento</FieldLabel>
                        <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                        >
                            <SelectTrigger id={field.name} className='w-full'>
                                <SelectValue placeholder="Selecciona un tipo de documento" />
                            </SelectTrigger>
                            <SelectContent className="select-content">
                                <SelectItem value="CI" className="select-item">
                                    Documento de identidad
                                </SelectItem>
                                <SelectItem value="PASSPORT" className="select-item">
                                    Pasaporte
                                </SelectItem>
                                <SelectItem value="DNI" className="select-item">
                                    DNI
                                </SelectItem>
                                <SelectItem value="DRIVER_LICENSE" className="select-item">
                                    Licencia de conducir
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="documentNumber"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Numero de documento</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Ingresa el numero de documento"
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="nationality"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Nacionalidad <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            value={field.value || ""}
                        >
                            <SelectTrigger id={field.name} className='w-full'>
                                <SelectValue placeholder="Selecciona un país" />
                            </SelectTrigger>
                            <SelectContent className="select-content">
                                {
                                    countries.map((country) => (
                                        <SelectItem key={country.code} value={country.name} className="select-item">
                                            {country.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Teléfono</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Ingresa el número de teléfono"
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <div className="col-span-2 flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="w-full lg:w-fit">
                    {isSubmitting ? (
                        <>
                            <Spinner className="size-6" />
                            <span>Cargando...</span>
                        </>
                    ) : (
                        <span>{submitLabel}</span>
                    )}
                </Button>
            </div>
        </form>
    );
};
