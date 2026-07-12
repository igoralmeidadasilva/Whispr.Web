export interface UserDto {
    id: string;
    name: string;
    email: string;
}

export interface CreateUserRequest {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}