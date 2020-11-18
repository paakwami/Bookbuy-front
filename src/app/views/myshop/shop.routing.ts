import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutService } from './checkout/checkout.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';
import { MyshopService } from './myshop.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { PublisherSeriesDetailsComponent } from './publisher-series-details/publisher-series-details.component';

export const myShopRoutes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: ProductsComponent,
    resolve: {
      App: MyshopService,
     },
  },{
    path: 'products/:id',
    component: ProductDetailsComponent,
    data: { title: 'Detail', breadcrumb: 'Detail' }
  },{
    path: 'cart',
    component: CartComponent,
    data: { title: 'Cart', breadcrumb: 'CART' }
  }, 
  {
    path: 'series',
    component: PublisherSeriesDetailsComponent,
    data: { title: 'Series', breadcrumb: 'Series' }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    resolve:{
      checkout: CheckoutService
    },
    data: { title: 'Checkout', breadcrumb: 'CHECKOUT' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve:{
      dashboard: DashboardService
    },
    data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
  }
 ]
}]