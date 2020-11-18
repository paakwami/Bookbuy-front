import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';
import { StateService } from '../sessions/state.service';
import { DataService } from 'app/shared/data/data.service';
import { map } from 'rxjs/operators';
import { UserDetails } from 'app/shared/models/userdetails.models';

@Injectable({
  providedIn: 'root'
})
export class PublisherService implements Resolve<any>{
  
user;
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
        this.getUser(),
        this.getUserDetails()
    ]).then(
        () => { 
            
            resolve();
        },
        reject
    ); 
}); 
  }

  getUser(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
        this.state.user
          .subscribe((response: any) =>{
            this.user = response;
            resolve(this.user)
          },
          reject);
  });
  }  

  getUserDetails(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
      if (this.data.userdetails$){
        resolve();
        reject
      }else{ 
        this.data.userdetails$ = this.crudeService.getPublisherDetails()
        resolve();
        reject
      }
    });
  } 

  } 
