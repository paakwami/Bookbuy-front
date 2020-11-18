import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';
import { DataService } from 'app/shared/data/data.service';
import { AgentNewSaleService } from '../agent-new-sale/agent-new-sale.service';
import { AgentSaleOverviewService } from '../agent-sale-overview/agent-sale-overview.service';

@Injectable({
  providedIn: 'root'
})
export class RetailSummaryService implements Resolve<any>{
  
  selectedretailer; 
  paymentmethods: any[];
  payments: any[];
  retailerdetails: any[];

  constructor(
    private router: Router, 
    private crudeService: ApiService, 
    private data: DataService,
    ) 
    {
      this.selectedretailer = this.data.selectedretailer
     }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return new Promise((resolve, reject) => {
      Promise.all([
      this.getPaymentMethods(),
      this.getRetailerDetails()
    ]).then(
        () => { 
            
            resolve();
        },
        reject
    ); 
}); 
  }

  getPaymentMethods(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if(this.data.paymentmethods){
        this.paymentmethods = this.data.paymentmethods
        resolve(this.paymentmethods);
        reject
      }else{ 
        this.crudeService.getPaymentMethod()
          .subscribe((response: any) =>{
            this.paymentmethods = response.data;
            this.data.paymentmethods = response.data
            resolve(this.paymentmethods)
          },
          reject);
      } 
  });
  }  

  getRetailerDetails(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
      this.crudeService.getRetailerDetails(this.selectedretailer)
      .subscribe((response: any) =>{
        this.retailerdetails = response;
        resolve(this.retailerdetails)
      },
      reject);
  });
  } 

}