import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';
import { DataService } from 'app/shared/data/data.service';
import { map } from 'rxjs/operators';
import { UserDetails } from 'app/shared/models/userdetails.models';

@Injectable({
  providedIn: 'root'
})
export class ShopService implements Resolve<any>{
  
publisherServe;
  constructor(
    private router: Router, 
    private crudeService: ApiService, 
    private data: DataService
    ) 
    {

     }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getPublisherServe()
    ]).then(
        () => { 
            
            resolve();
        },
        reject
    ); 
}); 
  }

  getPublisherServe(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {
      if (this.data.publisherServe){
        this.publisherServe = this.data.publisherServe
        resolve(this.publisherServe);
        reject
      }else{
        this.crudeService.getPublisherServe()
        .subscribe((response: any) =>{
          this.publisherServe = response;
          this.data.publisherServe = response
          resolve(this.publisherServe)
        },
        reject);
      }
  });
  } 

  } 
