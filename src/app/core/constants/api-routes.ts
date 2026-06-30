const baseUrl = import.meta.env?.['NG_APP_API_URL'] || 'http://localhost:8080';

export const ApiRoutes = {
    Hub: {
        Chat: baseUrl + '/chat-hub',
    },

    V1: {
        Auth: {
            Login: baseUrl + '/api/v1/auth/login',
            Logout: baseUrl + '/api/v1/auth/logout',
            Refresh: baseUrl + '/api/v1/auth/refresh'
        },

        Users: {
            Create: baseUrl + '/api/v1/users',
        }
    }
};