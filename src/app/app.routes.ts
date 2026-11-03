import { Routes } from '@angular/router';
import { Login } from "./pages/login/login";
import { Dashboard } from "./pages/dashboard/dashboard";
import { HomePage } from "./pages/home-page/home-page";

import { authGuard } from "./core/guards/auth-guard";

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard]
    },
    {
        path: '',
        component: HomePage,
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    }
];
