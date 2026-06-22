import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginUser } from "../server/login-user";
import { loginSchema, type LoginInput } from "../schemas";
import { useState } from "react";


export const useLoginForm = () => {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    }

    const loginForm = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: loginUser,
        onSuccess: ({ data, error }) => {
            
            if( error && !data ) {
                toast.error(error.message || "Error desconocido al iniciar sesión");
                return;
            }

            toast.success("¡Inicio de sesión exitoso!");
            router.navigate({ to: '/admin/dashboard', search: { page: 1, limit: 10, search: '' } });
        }
    });

    const onSubmit = loginForm.handleSubmit((values) => {
        mutateAsync({ data: values });
    });


    return {
        loginForm,
        isPending,
        showPassword,
        togglePasswordVisibility,
        onSubmit,
    };

};