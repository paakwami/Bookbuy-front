import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private jwt: JwtHelperService) { }

  handle(token){
    this.set(token);
  }

  set(token){
    localStorage.setItem('token', token);
  }
  
  get(){
    return localStorage.getItem('token');
  }

  remove(){
    localStorage.removeItem('token');
    localStorage.removeItem('user')
  }

  isValid(){

    if(localStorage.getItem('token')) {
      return true
    }else {
      return false
    }
    
  }

  loggedIn(){
    return this.isValid();
  }
}
