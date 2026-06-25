export interface AuthTokenDto {
    token: string;
    tokenExpirationAtUtc: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}