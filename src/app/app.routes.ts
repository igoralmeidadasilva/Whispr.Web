import { Routes } from '@angular/router';
import { AppRoutes } from './core/constants/app-routes';
import { Home } from './pages/public/home/home';
import { Register } from './pages/public/register/register';
import { Login } from './pages/public/login/login';

export const routes: Routes = [
    {
        path: AppRoutes.Home,
        component: Home,
        title: ''
    },
    {
        path: AppRoutes.Register,
        component: Register,
        title: 'Wispher :: Cadastro'
    },
    {
        path: AppRoutes.Login,
        component: Login,
        title: 'Wispher :: Login'
    }
];