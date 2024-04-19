import { Routes } from '@angular/router';
import { AuthGuard } from './Auth/Guard/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'todo' },

    {
        path:"",
        children:[
            {
                path:"sign-in",
                loadChildren:()=> import("./Auth/sigin/signin.routes")
            },
            {
                path:"sign-up",
                loadChildren:()=> import("./Auth/signup/signup.routes")
            },
            {
                path:"verify-account",
                loadChildren:()=> import("./Auth/verify-account/verify-account.routes")
            },
            {
                path:"forget-password",
                loadChildren:() => import("./Auth/forgot-password/forgot-password.routes")
            },
            {
                path:"reset-password",
                loadChildren:() => import("./Auth/reset-password/reset-password.routes")
            },
            {
                path:"check-email",
                loadChildren:() => import("./Auth/check-email/check-email.routes")
            }
           
        ]
    },
    {
        path:"",
        canActivate:[AuthGuard],
        canActivateChild:[AuthGuard],
        children:[
            {
                path:"todo",
                loadChildren:()=>import("./Modules/todo/todo.routes")
            }
        ]
    }
];
