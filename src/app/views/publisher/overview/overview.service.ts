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
export class OverviewService implements Resolve<any>{
  
  pubinit;
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
          this.getPublisherInitialization()
    ]).then(
        () => { 
            resolve(this.pubinit);
        },
        reject
    ); 
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
