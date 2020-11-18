import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';
import { DataService } from 'app/shared/data/data.service';
import { map } from 'rxjs/operators';
import { UserDetails } from 'app/shared/models/userdetails.models';
import { StateService } from 'app/views/sessions/state.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService implements Resolve<any>{
  
  pubinit;
  user;
  userdetails

  constructor(
    private router: Router, 
    private crudeService: ApiService, 
    private state: StateService,
    private data: DataService
    ) 
    {

     }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return new Promise((resolve, reject) => {
      Promise.all([
          this.getPublisherInitialization(),
          this.getUserDetails()
    ]).then(
        () => { 
            resolve(this.pubinit);
        },
        reject
    ); 
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

  getPublisherInitialization(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
      if (this.data.pubinit){
        this.pubinit = this.data.pubinit
        resolve(this.pubinit);
        reject
      }else{
        this.crudeService.getPublisherInit()
        .subscribe((response: any) =>{
          this.pubinit = response;
          this.data.pubinit = response
          resolve(this.pubinit)
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
// export class TransactionService {

//   constructor() { }
// }
