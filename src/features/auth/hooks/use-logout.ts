import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { logoutUser } from "../server/logout-user";

export const useLogout = () => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: logoutUser,
        onSuccess: async () => {
            queryClient.clear();
            await router.navigate({ to: "/auth/login" });
        },
    });

    return {
        logout,
        isLoggingOut,
    };
};
