import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';


import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/shared/shared.module';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { InvoicesRoutes } from './invoice.routing';
import { SaleOverviewComponent } from './sale-overview/sale-overview.component';
import { ToastrService } from 'ngx-toastr';
import { AgentSummaryComponent } from './agent-summary/agent-summary.component';
import { AgentSummaryService } from './agent-summary/agent-summary.service';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { PreInvoiceComponent } from './pre-invoice/pre-invoice.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AddpaymentMethodPopupComponent } from './addpayment-method-popup/addpayment-method-popup.component';
import { MakepaymentPopupComponent } from './makepayment-popup/makepayment-popup.component';
import { AddRetailerPopupComponent } from './add-retailer-popup/add-retailer-popup.component';
import { RetailSummaryComponent } from './retail-summary/retail-summary.component';
import { AgentSaleOverviewComponent } from './agent-sale-overview/agent-sale-overview.component';
import { AgentNewSaleComponent } from './agent-new-sale/agent-new-sale.component';
import { MakeRetailPaymentPopupComponent } from './make-retail-payment-popup/make-retail-payment-popup.component';
import { AddGroupPopupComponent } from './add-group-popup/add-group-popup.component';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { AddSeriesPopupComponent } from './add-series-popup/add-series-popup.component';
import { ShowproductComponent } from './showproduct/showproduct.component';


@NgModule({ 
  imports: [ 
    CommonModule,
    FormsModule,
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

    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
    SharedModule,

    RouterModule.forChild(InvoicesRoutes),
    
  ],
  declarations: [

    SaleOverviewComponent,
    AgentSummaryComponent,
    NewSaleComponent,
    PreInvoiceComponent,
    AddpaymentMethodPopupComponent,
    MakepaymentPopupComponent,
    AddRetailerPopupComponent,
    RetailSummaryComponent,
    AgentSaleOverviewComponent,
    AgentNewSaleComponent,
    MakeRetailPaymentPopupComponent,
    AddGroupPopupComponent,
    AddNewItemComponent,
    AddSeriesPopupComponent,
    ShowproductComponent],

    entryComponents: [

      ],
    providers: [
      ToastrService,
      AgentSummaryService
    ],
})
export class InvoiceModule { }