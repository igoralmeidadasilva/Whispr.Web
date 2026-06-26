import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { cookiesInterceptor } from './core/interceptors/cookies.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { refreshInterceptor } from './core/interceptors/refresh.interceptor';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loggingInterceptor,
        cookiesInterceptor,
        authInterceptor,
        refreshInterceptor])),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);