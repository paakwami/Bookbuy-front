import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from 'app/shared/data/data.service';
import { ApiService } from 'app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsaleService implements Resolve<any>{

  items;
  constructor(private data: DataService, private crudeService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any{
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getItems(),
      ]).then(
          () => {  
              resolve();
          },
          reject
      );
        })}

   getItems(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if(this.data.items){
        this.items = this.data.items
        resolve(this.items);
        reject
      }else{ 
        this.crudeService.getItems()
          .subscribe((response: any) =>{
            this.items = response.data;
            this.data.items = response.data
            resolve(this.items)
          },
          reject);
      }
  });
  }

  
}
