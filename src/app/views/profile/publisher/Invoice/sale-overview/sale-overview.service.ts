import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';
import { DataService } from 'app/shared/data/data.service';

@Injectable({
  providedIn: 'root'
})
export class SaleOverviewService implements Resolve<any>{
  
  approvedpartners: any[];
  agents: any[]; 
  userdetails;

  constructor(
    private router: Router, 
    private crudeService: ApiService, 
    private data: DataService,
    ) 
    { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return new Promise((resolve, reject) => {
      Promise.all([
      this.getApprovedPartners(),
      this.getAgents(),
      this.getUserDetails()
    ]).then(
        () => { 
            
            resolve(); 
        },
        reject
    );
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
          resolve(this.userdetails)
        },
        reject);
      }
  });
  } 
}