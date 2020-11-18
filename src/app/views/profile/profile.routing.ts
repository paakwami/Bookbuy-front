import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile.component";
import { PublisherComponent } from './publisher/publisher.component';
import { PublisherService } from 'app/views/profile/publisher/publisher.service';
import { AppserviceService } from 'app/appservice.service';

export const ProfileRoutes: Routes = [
  { 
    path: '',
    component: ProfileComponent,
    children: [{
      path: 'overview',
      component: PublisherComponent,
      data: { title: 'Overview', breadcrumb: 'OVERVIEW' },
      resolve:{
        app: AppserviceService,
        publisher: PublisherService
      }
    }  
   ]
  }
];