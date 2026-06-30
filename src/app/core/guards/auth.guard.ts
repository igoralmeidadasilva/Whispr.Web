import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { AuthManagerService } from '../services/auth-manager.service';
import { isPlatformBrowser } from '@angular/common';
import { AppRoutes } from '../constants/app-routes';

export const authGuard: CanActivateFn = (route, state) => {
    const platformId = inject(PLATFORM_ID);
    const router = inject(Router);
    const authManagerService = inject(AuthManagerService);

    if (!isPlatformBrowser(platformId)) {
        return true; 
    }

    const userState = authManagerService.retriveAuthenticatedUser();

    if (userState.isAuthenticated) {
        return true;
    }

    const attemptedUrl = state.url;

    return router.createUrlTree([AppRoutes.Login], {
        queryParams: { returnUrl: attemptedUrl }
    });
};