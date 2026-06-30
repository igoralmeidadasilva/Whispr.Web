export const ApiRoutes = {
    Hub: {
        Chat: import.meta.env['NG_APP_API_URL'] + '/chat-hub',
    },

    V1: {
        Auth: {
            Login: import.meta.env['NG_APP_API_URL'] + '/api/v1/auth/login',
            Logout: import.meta.env['NG_APP_API_URL'] + '/api/v1/auth/logout',
            Refresh: import.meta.env['NG_APP_API_URL'] + '/api/v1/auth/refresh'
        },

        Users: {
            Create: import.meta.env['NG_APP_API_URL'] + '/api/v1/users',
        }
    }
};