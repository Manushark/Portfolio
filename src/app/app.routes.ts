import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Manuel Rivas | Junior Software Developer'
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página No Encontrada | Manuel Rivas'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
