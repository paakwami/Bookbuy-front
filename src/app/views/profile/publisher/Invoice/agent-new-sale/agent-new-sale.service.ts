import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from 'app/shared/data/data.service';
import { ApiService } from 'app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AgentNewSaleService implements Resolve<any>{

  stocks;
  constructor(private data: DataService, private crudeService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any{
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getStocks(),
      ]).then(
          () => { 
              resolve();
          },
          reject
      );
        })}

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

  
}


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AgentNewSaleService {

//   constructor() { }
// }
