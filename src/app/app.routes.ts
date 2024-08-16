import { Routes } from '@angular/router';
import { AuthService } from './services/AuthService';
export const routes: Routes = [
    {
        path: 'main',
        loadComponent: () => import('./main/main.component'),
        children: [
            { path: 'modules', loadComponent: () => import('./main/pages/modules-views/modules-views.component'), title: 'Módulos', data: { title: 'Módulos' } },
            { path: 'company', loadComponent: () => import('./main/pages/company/company.component'), title: 'Companía', data: { title: 'Companía' } },
            { path: 'support', loadComponent: () => import('./main/pages/modules-views/support/support.component'), title: 'Soporte', data: { title: 'SOPORTE SYSCORP S.A' } }
        ],
        canActivate: [AuthService.canActivate],
    },
    {
        path: 'login',
        loadComponent: () => import('./home/login/login.component'),
        pathMatch: 'full',

    },
    {
        path: 'recover',
        loadComponent: () => import('./home/recover-password/recover-password.component'),
    },
    {
        path: 'restore/:code',
        loadComponent: () => import('./home/restore-password/restore-password.component'),
    },
    // Default path
    {
        path: '',
        loadComponent: () => import('./home/landing-page/landing-page.component'),
        pathMatch: 'full',
    },
];
