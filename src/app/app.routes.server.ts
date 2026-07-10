import { RenderMode, ServerRoute } from '@angular/ssr';
import { AppRoutes } from './core/constants/app-routes';

export const serverRoutes: ServerRoute[] = [
  {
    path: AppRoutes.Chat,
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
