import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from 'app/shared/data/data.service';
import { ApiService } from 'app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ShopdataService } from './shopdata.service';

@Injectable({
  providedIn: 'root'
})
export class MyshopService implements Resolve<any>{

  public publishers;
  constructor(private data: DataService, 
    private crudeService: ApiService, 
    private shopdata: ShopdataService, 
    private toastr: ToastrService) {
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any{
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getStoreItems(),
      ]).then(
          () => { 
              resolve();
          },
          reject
      );
        })}

        getStoreItems(): Promise<any[]>
        {
          return new Promise((resolve, reject) => {
              this.publishers = this.crudeService.getStoreItems()
              .subscribe((response: any)=>{
                this.publishers = response.data
                this.shopdata.publishers = response.data
                resolve(this.publishers)
              },
               
              reject)
        });
        }
}

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class MyshopService {

//   constructor() { }
// }
