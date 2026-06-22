import type { AuthUser } from "./auth-user.type";


export interface LoginResponse {
    user:  AuthUser;
    token: string;
}
