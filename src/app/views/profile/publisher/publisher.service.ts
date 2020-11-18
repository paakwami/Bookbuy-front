import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';
import { StateService } from 'app/views/sessions/state.service';
import { DataService } from '../../../shared/data/data.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Injectable({
  providedIn: 'root' 
})
export class PublisherService implements Resolve<any>{

  public learnerstages: any[] 
  public subjects: any[]
  public items: any[];
  public publishers: any[];
  public partners: any[];
  public agents: any[];
  public pendingPublishers: any[];
  public paymentmethods: any[];
  public retailers: any[];
  public stocks: any[]
  public approvedpartners: any[];
  public userdetails;
  public checkToken: boolean;
  public classgroup: any[];
  public load: boolean = false;
 
  constructor(
    private router: Router, 
    private crudeService: ApiService,
    private data: DataService,
    private state: StateService,
    public loader: AppLoaderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    this.loader.open()
    return new Promise((resolve, reject) => {

      
      if(!this.state.role.admin && !this.state.role.publisher && this.state.role.agent){
       Promise.all([
         this.getPublishers(),
         this.getPartners(),
         this.getAgents(),
         this.getRetailers(),
         this.getStocks(),
         this.getUserDetails()
       ]).then(
           () => { 
            this.loader.close()
               resolve();
           },
           reject
       );
 
      }
     if(this.state.role.admin && this.state.role.publisher && !this.state.role.agent){
      Promise.all([
        this.getClassgroups(),
        this.getLearnerstages(),
        this.getSubjects(),
        this.getItems(),
        this.getPublishers(),
        this.getPartners(),
        this.getAgents(),
        this.getpendingPublishers(),
        this.getpaymentmethods(),
        this.getUserDetails()
      ]).then(
          () => { 
            this.loader.close()
              resolve();
          },
          reject
      );

     }
     if(this.state.role.admin && !this.state.role.publisher && !this.state.role.agent){
      Promise.all([
        this.getLearnerstages(),
        this.getSubjects(),
        this.getpendingPublishers(),
        this.getpaymentmethods()
      ]).then(
          () => { 
            this.loader.close()
              resolve();
          },
          reject
      );

     }
     if(!this.state.role.admin && this.state.role.publisher && !this.state.role.agent){
      Promise.all([
        this.getItems(),
        this.getPublishers(),
        this.getPartners(),
        this.getAgents(),
        this.getLearnerstages(),
        this.getSubjects(),
        this.getApprovedPartners(),
        this.getUserDetails()
      ]).then(
          () => { 
            this.loader.close()
              resolve();
          },
          reject
      );

     }
    
     
});
}
getClassgroups(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
      if (this.data.classgroup){
        this.classgroup = this.data.classgroup
        resolve(this.classgroup);
        reject
      }else{
        this.crudeService.getClassgroups()
        .subscribe((response: any) =>{
          this.classgroup = response.data;
          this.data.classgroup = response.data
          resolve(this.classgroup)
        },
        reject);
      }
  });
  } 
getApprovedPartners(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
      if (this.data.approvedpartners){
        this.approvedpartners = this.data.approvedpartners
        resolve(this.approvedpartners);
        reject
      }else{
        this.crudeService.getApprovedPartners()
        .subscribe((response: any) =>{
          this.approvedpartners = response.data;
          this.data.approvedpartners = response.data
          resolve(this.approvedpartners)
        },
        reject);
      }
  });
  }
getStocks(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if(this.data.stocks){
        this.stocks = this.data.stocks
        resolve(this.stocks);
        reject
      }else{ 
        this.crudeService.getStocks()
          .subscribe((response: any) =>{
            this.stocks = response.data;
            this.data.stocks = response.data
            resolve(this.stocks)
          },
          reject);
      }
  });
  }
getRetailers(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if(this.data.retailers){
        this.retailers = this.data.retailers
        resolve(this.retailers);
        reject
      }else{ 
        this.crudeService.getRetailer()
          .subscribe((response: any) =>{
            this.retailers = response.data;
            this.data.retailers = response.data
            resolve(this.retailers)
          },
          reject);
      }
  });
  }
getLearnerstages(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if(this.data.learnerstages){
        this.learnerstages = this.data.learnerstages
        resolve(this.learnerstages);
        reject
      }else{ 
        this.crudeService.getLearnerStages()
          .subscribe((response: any) =>{
            this.learnerstages = response.data;
            this.data.learnerstages = response.data
            resolve(this.learnerstages)
          },
          reject);
      }
  });
  } 
getpendingPublishers(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if(this.data.pendingPublishers){
        this.pendingPublishers = this.data.pendingPublishers
        resolve(this.pendingPublishers);
        reject
      }else{
        this.crudeService.getPendingPublishers()
          .subscribe((response: any) =>{
            this.pendingPublishers = response;
            this.data.pendingPublishers = response
            resolve(this.pendingPublishers)
          },
          reject);
      }
  }); 
  } 
getpaymentmethods(): Promise<any[]>
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
getSubjects(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if (this.data.subjects){
        this.subjects = this.data.learnerstages
        resolve(this.subjects);
        reject
      }else{
        this.crudeService.getSubjects()
        .subscribe((response: any) =>{
          this.subjects = response.data;
          this.data.subjects = response.data
          resolve(this.subjects)
        },
        reject);
      }
  });
  } 
getItems(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if (this.data.items){
        this.items = this.data.items
        resolve(this.items);
        reject
      }else{
        this.crudeService.getItems()
        .subscribe((response: any) =>{
          this.items = response.data;
          this.data.items = response.data
          resolve(this.items)
        },
        reject);
      }
  });
  } 
getPublishers(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
      if (this.data.publishers){
        this.publishers = this.data.publishers
        resolve(this.publishers);
        reject
      }else{
        this.crudeService.getPublishers()
        .subscribe((response: any) =>{
          this.publishers = response;
          this.data.publishers = response
          resolve(this.publishers)
        },
        reject);
      }
  });
  } 
getPartners(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
      if (this.data.partners){
        this.partners = this.data.partners
        resolve(this.partners);
        reject
      }else{
        this.crudeService.getPartners()
        .subscribe((response: any) =>{
          this.partners = response.data;
          this.data.partners = response.data
          resolve(this.partners)
        },
        reject);
      }
  });
  } 
getAgents(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
      if (this.data.agents){
        this.agents = this.data.agents
        resolve(this.agents);
        reject
      }else{
        this.crudeService.getAgents()
        .subscribe((response: any) =>{
          this.agents = response.data;
          this.data.agents = response
          resolve(this.agents)
        },
        reject);
      }
  });
  } 
getUserDetails(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
      if (this.data.userdetails){
        this.userdetails = this.data.userdetails
        resolve(this.userdetails);
        reject
      }else{
        this.crudeService.getUserDetails()
        .subscribe((response: any) =>{
          this.userdetails = response;
          this.data.userdetails = response
          console.log(this.userdetails)
          resolve(this.userdetails)
        },
        reject);
      }
  });
  } 

}
