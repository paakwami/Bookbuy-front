import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';

import { ProfileComponent } from "./profile.component";
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { ProfileRoutes } from "./profile.routing";
import { PublisherComponent } from './publisher/publisher.component';
import { NewInventoryPopupComponent } from './publisher/Invoice/new-inventory-popup/new-inventory-popup.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';


import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { AddStockPopupComponent } from './publisher/Invoice/add-stock-popup/add-stock-popup.component';
import { AddClassPopupComponent } from './publisher/Invoice/add-class-popup/add-class-popup.component';
import { AddSubjectPopupComponent } from './publisher/Invoice/add-subject-popup/add-subject-popup.component';
import { RequestAgentPopupComponent } from './publisher/Invoice/request-agent-popup/request-agent-popup.component';
import { RespondRequestPopupComponent } from './publisher/Invoice/respond-request-popup/respond-request-popup.component';
import { RequestPublisherPopupComponent } from './publisher/Invoice/request-publisher-popup/request-publisher-popup.component';
import { RespondPublisherComponent } from './publisher/Invoice/respond-publisher/respond-publisher.component';

@NgModule({ 
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule, 
    SharedPipesModule,
    SharedMaterialModule,
    
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    
    FlexLayoutModule,
    TranslateModule, 
    SharedModule,

    RouterModule.forChild(ProfileRoutes),
    
  ],
  declarations: [ProfileComponent, 
    ProfileOverviewComponent, 
    PublisherComponent, 
    NewInventoryPopupComponent, 
    AddStockPopupComponent, 
    AddClassPopupComponent, 
    AddSubjectPopupComponent, 
    RequestPublisherPopupComponent, 
    RequestAgentPopupComponent,  
    RespondRequestPopupComponent, 
    RespondPublisherComponent,
    ],

    entryComponents: [
      NewInventoryPopupComponent, 
      AddStockPopupComponent,
      AddClassPopupComponent,
      AddSubjectPopupComponent,
      RequestPublisherPopupComponent,
      RequestAgentPopupComponent,  
      RespondRequestPopupComponent, 
      RespondPublisherComponent
      ],
    providers: [
    ],
})
export class ProfileModule { }
