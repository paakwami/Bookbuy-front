import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { TokenService } from './views/sessions/token.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  intercept(req, next){
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.token.get()}`
      }
    })
    return next.handle(tokenizedReq)
  }
  constructor(private token: TokenService) { }
}
