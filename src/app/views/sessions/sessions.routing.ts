import { Signup4Component } from './signup4/signup4.component';
import { Routes } from "@angular/router";

import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ErrorComponent } from "./error/error.component";
import { Signin4Component } from './signin4/signin4.component';
import { RoleComponent } from './role/role.component';
import { AuthGuard } from 'app/shared/services/auth/auth.guard';
import { BeforeLoginService } from 'app/shared/services/before-login.service';

export const SessionsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "role",
        component: RoleComponent,
        data: { title: "role" }
      },
      { 
        path: "signup4",
        component: Signup4Component,
        canActivate:[BeforeLoginService],
        data: { title: "Signup4" }
      },
      {
        path: "signin4",
        component: Signin4Component,
        canActivate:[BeforeLoginService],
        data: { title: "Signin4" }
      },
     {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        data: { title: "Forgot password" }
      },
      {
        path: "lockscreen",
        component: LockscreenComponent,
        data: { title: "Lockscreen" }
      },
      {
        path: "404",
        component: NotFoundComponent,
        data: { title: "Not Found" }
      },
      {
        path: "error",
        component: ErrorComponent,
        data: { title: "Error" }
      }
    ]
  }
];
