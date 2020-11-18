import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';
import { DataService } from 'app/shared/data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AgentSaleOverviewService implements Resolve<any>{

  public retailers: any[];
  public selectedretailer;
  public userdetails;

  constructor(private router: Router, private crudeService: ApiService, private data: DataService) { 
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getRetailers(),
        this.getUserDetails()
    ]).then(
        () => { 
            
            resolve();
        },
        reject
    );
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

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AgentSaleOverviewService {

//   constructor() { }
// }
