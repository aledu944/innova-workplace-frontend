import { createServerFn } from "@tanstack/react-start";
import { deleteCookie } from "@tanstack/react-start-server";

export const logoutUser = createServerFn({ method: "POST" }).handler(() => {
    deleteCookie("ICW_TOKEN");
    deleteCookie("ICW_USER");
});
