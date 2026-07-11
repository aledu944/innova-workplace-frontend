import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start-server";

import { loginSchema } from "../schemas";
import apiClient from "@/shared/lib/api-client";
import { handleServerFunctionError } from "@/shared/helpers";
import type { LoginResponse } from "../types/login-response.interface";



export const loginUser = createServerFn({ method: "POST" })
    .inputValidator(loginSchema)
    .handler(
        async ({ data: credentials }) => {

            try {
                const { data } = await apiClient.post<LoginResponse>("/auth/login", credentials);
                console.log(data);
                setCookie('ICW_TOKEN', data.token);
                setCookie('ICW_USER', JSON.stringify(data.user));

                return {
                    data,
                    error: null
                };

            } catch (error) {
                return handleServerFunctionError(error);
            }
        }
    );
