import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {HeaderComponent} from '../header/header.component'
import {FooterComponent} from '../footer/footer.component'
import {IntroTwoComponent} from '../intro-two/intro-two.component'
import {CtaComponent} from '../cta/cta.component'
import {PricingsComponent} from '../pricings/pricings.component'
import {ServicesCarouselComponent} from '../services-carousel/services-carousel.component'
import {PortfolioCarouselComponent} from '../portfolio-carousel/portfolio-carousel.component'
import {TestimonialsComponent} from '../testimonials/testimonials.component'
import {ContactComponent} from '../contact/contact.component'
 
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

import { LandingRoutes } from './landing.routing';
import { NguCarouselModule } from '@ngu/carousel';
import { LandingComponent } from './landing.component';
import {  ErrorHandler,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(LandingRoutes)
  ],
  declarations: [
    LandingComponent,
    PortfolioCarouselComponent,
    ServicesCarouselComponent,
    PricingsComponent,
    HeaderComponent,FooterComponent,IntroTwoComponent,
    TestimonialsComponent,
    ContactComponent,
    CtaComponent
  ],
  
})
export class LandingModule { }
