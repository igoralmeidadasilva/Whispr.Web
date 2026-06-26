export interface AuthToken {
    token: string;
    tokenExpirationAtUtc: string;
}

export interface UserState {
    isAuthenticated: boolean;
    id: string | null;
    name: string | null;
    email: string | null;
}

export interface LoginRequest {
    email: string;
    password: string;
}