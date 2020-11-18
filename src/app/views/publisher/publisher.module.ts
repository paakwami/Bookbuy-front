import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { publisher } from './publisher.routing';
import { PublisherComponent } from './publisher.component';
import { OverviewComponent } from './overview/overview.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ShopComponent } from './shop/shop.component';



@NgModule({
  declarations: [PublisherComponent, OverviewComponent, TransactionComponent, ShopComponent],
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

    RouterModule.forChild(publisher),
  ],
})
export class PublisherModule { }
