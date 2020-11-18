import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../views/sessions/token.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | 
  Observable<boolean> | Promise<boolean> {
    if (this.token.loggedIn()) {
      return true;
    } else {
      this.toastr.error('error','You should sign in first')
      this.router.navigate(['/sessions/signin4'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
  
  } 
  }

  constructor(private token: TokenService, private router: Router, private toastr: ToastrService ) { }
}
