import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';
import { DataService } from 'app/shared/data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AgentSummaryService implements Resolve<any>{
  
  selectedagent; 
  paymentmethods: any[];
  payments: any[];
  agentdetails;

  items;
  newsaledata;

  constructor(private router: Router, private crudeService: ApiService, private data: DataService) { 
    this.data.selectedagent = this.selectedagent;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return new Promise((resolve, reject) => {
      Promise.all([ 
      this.getPaymentMethods(),
      this.getPayments(),
      this. getAgentDetails()
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

  getPayments(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
        this.crudeService.getPayments(this.selectedagent.id)
          .subscribe((response: any) =>{
            this.payments = response.data;
            resolve(this.payments)
          },
          reject);
      
  });
  } 
 
  getAgentDetails(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
      this.crudeService.getAgentDetails(this.selectedagent)
      .subscribe((response: any) =>{
        this.agentdetails = response;
        resolve(this.agentdetails)
      },
      reject);
  });
  } 
  
}