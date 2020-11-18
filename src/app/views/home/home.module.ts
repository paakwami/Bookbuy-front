import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

import { HomeRoutes } from './home.routing';

import { NguCarouselModule } from '@ngu/carousel';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FlexLayoutModule,
    SharedDirectivesModule,
    SharedComponentsModule,
    SharedMaterialModule,
    PerfectScrollbarModule,
    NguCarouselModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [HomeComponent
  ]
})
export class HomeModule { }
