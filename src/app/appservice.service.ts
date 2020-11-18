import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from 'app/shared/data/data.service';
import { ApiService } from 'app/shared/services/api.service';
import { StateService } from './views/sessions/state.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService implements Resolve<any>{

  public token;
  constructor(private data: DataService, private crudeService: ApiService, private router: Router, private state: StateService, private toastr: ToastrService) {
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any{
    return new Promise((resolve, reject) => {
      Promise.all([
        this.checktoken(),
      ]).then(
          () => { 
              resolve();
          },
          reject
      );
        })}

        checktoken(): Promise<any[]>
        {
          return new Promise((resolve, reject) => {
              this.crudeService.checkToken()
                .subscribe((response: any) =>{
                  this.token = response;
                  this.validate(this.token);
                  resolve(this.token)
                },
                reject);
        });
        }

        validate(bol){
          if(!bol){
            this.toastr.error('error', 'Your loggin details is timed out, please relogin')
            this.state.signOut()
            this.router.navigate(['/sessions/signin4']);
          }
        }

  
}


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AgentNewSaleService {

//   constructor() { }
// }


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AppserviceService {

//   constructor() { }
// }
