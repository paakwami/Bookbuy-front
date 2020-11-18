import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';
import { DataService } from 'app/shared/data/data.service';

@Injectable({
  providedIn: 'root'
})
export class ShowproductService implements Resolve<any>{
  

  selectedproduct: any[];
  

  constructor(private router: Router, private crudeService: ApiService, private data: DataService) { 
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return new Promise((resolve, reject) => {
      Promise.all([ 
      this.getSelectedProduct(),
    ]).then(
        () => { 
            
            resolve();
        },
        reject
    );
}); 
  }

  getSelectedProduct(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if(this.data.selectedproduct){
        this.selectedproduct = this.data.selectedproduct
        resolve(this.selectedproduct);
        reject
      }else{ 
        this.crudeService.getClassgroups()
          .subscribe((response: any) =>{
            this.selectedproduct = response.data;
            this.data.classgroup = response.data
            resolve(this.selectedproduct)
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
// export class ShowproductService {

//   constructor() { }
// }
