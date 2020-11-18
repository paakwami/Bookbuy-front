import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from 'app/shared/data/data.service';
import { ApiService } from 'app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements Resolve<any>{

  public orders;
  constructor(private data: DataService, 
    private crudeService: ApiService, 
) {
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any{
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getOrders(),
      ]).then(
          () => { 
              resolve();
          },
          reject
      );
        })}

        getOrders(): Promise<any[]>
        {
          return new Promise((resolve, reject) => {
      
            if(this.data.orders){
              this.orders = this.data.orders
              resolve(this.orders);
              reject
            }else{ 
              this.crudeService.getOrders()
                .subscribe((response: any) =>{
                  this.orders = response;
                  this.data.orders = response
                  resolve(this.orders)
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
// export class DashboardService {

//   constructor() { }
// }
