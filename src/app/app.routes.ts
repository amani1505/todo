import { Routes, CanActivateFn } from '@angular/router';
import { SiginComponent } from './Auth/sigin/sigin.component';
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
            },{
                path:"verify-account",loadChildren:()=> import("./Auth/verify-account/verify-account.routes")
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
