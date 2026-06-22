import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useLoginForm } from "../hooks/use-login-form";
import { Controller } from "react-hook-form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components/ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Eye, EyeOff, Mail01Icon, Password } from "@hugeicons/core-free-icons";



export function LoginForm() {

    const { isPending, loginForm, onSubmit, showPassword, togglePasswordVisibility } = useLoginForm();

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Bienvenido de nuevo 👋🏻
                    </CardTitle>
                    <CardDescription>
                        Inicia sesión en tu cuenta para continuar.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} noValidate>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={loginForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">Correo electronico</FieldLabel>
                                        <InputGroup>
                                            <InputGroupAddon>
                                                <HugeiconsIcon
                                                    icon={Mail01Icon}
                                                />
                                            </InputGroupAddon>

                                            <InputGroupInput
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                                autoComplete="off"
                                                id="email"
                                                type="email"
                                                placeholder="mail@example.com"
                                                required

                                            />
                                        </InputGroup>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="password"
                                control={loginForm.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <InputGroup>
                                            <InputGroupAddon>
                                                <HugeiconsIcon
                                                    icon={Password}
                                                />
                                            </InputGroupAddon>

                                            <InputGroupInput
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                                autoComplete="off"
                                                placeholder="********"
                                                required
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                            />
                                            <InputGroupAddon align="inline-end">
                                                <button className="mr-2" type="button" onClick={togglePasswordVisibility}>
                                                    <HugeiconsIcon
                                                        scale={18}
                                                        className="size-5"
                                                        icon={showPassword ? EyeOff : Eye}
                                                    />
                                                </button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>

                                )}
                            />
                            <Button type="submit">
                                {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
