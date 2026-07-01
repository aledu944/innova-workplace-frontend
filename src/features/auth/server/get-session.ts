import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start-server";
import { redirect } from "@tanstack/react-router";

export const getSession = createServerFn({ method: "GET" }).handler(() => {
    const token = getCookie("ICW_TOKEN");

    if (!token) {
        throw redirect({ to: "/auth/login" });
    }

    return { token };
});
