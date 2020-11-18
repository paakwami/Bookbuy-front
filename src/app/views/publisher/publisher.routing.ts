import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { OverviewService } from './overview/overview.service';
import { PublisherComponent } from './publisher.component';
import { PublisherService } from './publisher.service';
import { ShopComponent } from './shop/shop.component';
import { ShopService } from './shop/shop.service';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionService } from './transaction/transaction.service';



export const publisher: Routes = [{
  path: '',
  data: { title: 'Publisher', breadcrumb: 'Publisher' },
  children: [{
    path: '',
    
    component: PublisherComponent,
    resolve: {
      App: PublisherService,
     },
     children:[{
      path: '',
      data: { title: 'Home', breadcrumb: 'Home' },
      component: OverviewComponent,
      resolve: {
        App:OverviewService,
       },

     }]
  },
 ],
 
},
{
  path: 'transaction',
  data: { title: 'Transaction', breadcrumb: 'Transaction' },
    component: TransactionComponent,
    resolve: {
      App: TransactionService,
     }
},
{
  path: 'shop',
  data: { title: 'Shop', breadcrumb: 'Shop' },
    component: ShopComponent,
    resolve: {
      App: ShopService,
     }
}


]