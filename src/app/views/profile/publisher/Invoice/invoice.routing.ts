import { Routes } from '@angular/router';
import { SaleOverviewComponent } from './sale-overview/sale-overview.component';
import { DataService } from 'app/shared/data/data.service';
import { AgentSummaryComponent } from './agent-summary/agent-summary.component';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { AgentSummaryService } from './agent-summary/agent-summary.service';
import { PreInvoiceComponent } from './pre-invoice/pre-invoice.component';
import { BeforeLoginService } from 'app/shared/services/before-login.service';
import { AfterLoginService } from 'app/shared/services/after-login.service';
import { NewsaleService } from './new-sale/newsale.service';
import { RetailSummaryComponent } from './retail-summary/retail-summary.component';
import { AgentSaleOverviewComponent } from './agent-sale-overview/agent-sale-overview.component';
import { AgentSaleOverviewService } from './agent-sale-overview/agent-sale-overview.service';
import { AgentNewSaleComponent } from './agent-new-sale/agent-new-sale.component';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { AgentNewSaleService } from './agent-new-sale/agent-new-sale.service';
import { RetailSummaryService } from './retail-summary/retail-summary.service';
import { SaleOverviewService } from './sale-overview/sale-overview.service';
import { AppserviceService } from 'app/appservice.service';
import { NewitemService } from './add-new-item/newitem.service';
import { ShowproductComponent } from './showproduct/showproduct.component';
import { ShowproductService } from './showproduct/showproduct.service';



export const InvoicesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: SaleOverviewComponent,
        data: { title: 'home', breadcrumb: 'HOME' },
        resolve:{
          app:AppserviceService,
          subject:SaleOverviewService
        }
      },
      { 
      path: 'agentsummary',
      component: AgentSummaryComponent,
      data: { title: 'agentsummary', breadcrumb: 'AGENT SUMMARY' },
      resolve:{
        app:AppserviceService,
        subject:AgentSummaryService
      }
     }, 
     {
      path: 'newsale',
      component: NewSaleComponent,
      data: { title: 'newsale', breadcrumb: 'NEW SALE' },
      resolve:{
        app:AppserviceService,
        subject:NewsaleService
      }
     },
     {
      path: 'retailsummary',
      component: RetailSummaryComponent,
      data: { title: 'retailsummary', breadcrumb: 'RETAIL SUMMARY' },
      resolve:{
        app:AppserviceService,
        subject:RetailSummaryService
      }
     }, 
     {
      path: 'retail',
      component: AgentSaleOverviewComponent,
      data: { title: 'retailhome', breadcrumb: 'RETAIL HOME' },
      resolve:{
        app:AppserviceService,
        subject:AgentSaleOverviewService
      }
     } ,
     {
      path: 'agentnewsale',
      component: AgentNewSaleComponent,
      data: { title: 'agentnewsale', breadcrumb: 'AGENT NEW SALE' },
      resolve:{
        app:AppserviceService,
        subject:AgentNewSaleService
      }
     },
     {
      path: 'newitem',
      component: AddNewItemComponent,
      data: { title: 'New Item', breadcrumb: 'Add New Item' },
      resolve:{
        app:AppserviceService,
        subject:NewitemService,
      }
     },
     {
      path: 'showproduct',
      component: ShowproductComponent,
      data: { title: 'Show Product', breadcrumb: 'Your New Product' },
      resolve:{
        app:AppserviceService,
        product:ShowproductService,
      }
     },
    ],
  },
  
  {
    path: 'preinvoice',
    component: PreInvoiceComponent,
    data: { title: 'preinvoice', breadcrumb: 'AGREEMENT INVOICE' },
    // resolve:{
    //   subject:AgentSummaryService
    // }
  }  

];