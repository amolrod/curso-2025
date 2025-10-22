import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'reservas',
    loadComponent: () => import('./reservas/reservas.page').then( m => m.ReservasPage)
  },
  {
    path: 'precios',
    loadComponent: () => import('./precios/precios.page').then( m => m.PreciosPage)
  },
];
