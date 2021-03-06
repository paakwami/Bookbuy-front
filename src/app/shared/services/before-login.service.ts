import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../views/sessions/token.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | 
  Observable<boolean> | Promise<boolean> {
    if (!this.token.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/profile/overview'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
  
  } 
  }

  constructor(private token: TokenService, private router: Router) { }
}
