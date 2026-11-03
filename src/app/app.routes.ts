import { Routes } from '@angular/router';
import { Login } from "./pages/login/login";
import { Dashboard } from "./pages/dashboard/dashboard";
import { HomePage } from "./pages/home-page/home-page";
import { ChallengePage } from "./pages/challenge-page/challenge-page";

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
        path: 'challenges/:slug',
        component: ChallengePage,
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
