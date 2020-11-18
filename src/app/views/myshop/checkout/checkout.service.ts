import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from 'app/shared/data/data.service';
import { ApiService } from 'app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements Resolve<any>{

  public regions;
  constructor(private data: DataService, 
    private crudeService: ApiService, 
) {
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any{
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getRegions(),
      ]).then(
          () => { 
              resolve();
          },
          reject
      );
        })}

        getRegions(): Promise<any[]>
        {
          return new Promise((resolve, reject) => {
      
            if(this.data.regions){
              this.regions = this.data.regions
              resolve(this.regions);
              reject
            }else{ 
              this.crudeService.getRegions()
                .subscribe((response: any) =>{
                  this.regions = response.data;
                  this.data.regions = response.data
                  resolve(this.regions)
                },
                reject);
            }
        });
        } 
}
