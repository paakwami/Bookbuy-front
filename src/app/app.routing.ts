import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { AfterLoginService } from './shared/services/after-login.service';
import { ProfileService } from './views/profile/profile.service';
import { AppserviceService } from './appservice.service';
import { UserLayoutComponent } from './shared/components/layouts/user-layout/user-layout.component';

export const rootRouterConfig: Routes = [
  { 
    path: '', 
     //redirectTo: 'home', 
    // pathMatch: 'full',
    loadChildren: () => import('./views/landing/landing.module').then(m => m.LandingModule) ,
    data: { title: 'BookBuy - Landing' },
  },
  {
    path: '', 
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'publisher', 
        loadChildren: () => import('./views/publisher/publisher.module').then(m => m.PublisherModule),
        data: { title: 'BookBuy - Publisher'} 
      }
    ]
  },

  {
    path: '', 
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'sessions', 
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session'} 
      }
    ]
  },
  {
    path: '', 
    canActivate: [AuthGuard],
    resolve: {
     // App: AppserviceService,
     },
    children: [ 
     
      {
        path: 'profile', 
        component: AdminLayoutComponent,
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule), 
        data: { title: 'BookBuy - Profile', breadcrumb: 'PROFILE'},
        canActivate:[AfterLoginService],
        resolve:{ 
          publisher: ProfileService
        }
      }, 
      {
        path: 'invoice', 
        component: AdminLayoutComponent,
        loadChildren: () => import('./views/profile/publisher/Invoice/invoice.module').then(m => m.InvoiceModule), 
        data: { title: 'BookBuy - Invoice', breadcrumb: 'INVOICE'},
        resolve:{
          App:AppserviceService,
        },
        canActivate:[AfterLoginService]
      },
      {
        path: 'myshop',
        component: UserLayoutComponent,
        loadChildren: () => import('./views/myshop/myshop.module').then(m => m.MyshopModule),
        data: { title: 'Shop', breadcrumb: 'SHOP'}
      },
    ]
  },
  { 
    path: '**', 
    redirectTo: 'sessions/404'
  }
];

