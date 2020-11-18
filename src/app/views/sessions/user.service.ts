import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { StateService } from './state.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  user: BehaviorSubject<any>;
  userdetails: BehaviorSubject<any>;
  token;
  order;

  constructor(
    private tok: TokenService,
    private state: StateService
  ) { this.user = new BehaviorSubject({}) , this.userdetails = new BehaviorSubject({})}

  starter(){
    if(this.state.status){
      this.getUser()
    }else{
      return'not logged in';
    }
  }
 
  getUser(){
    this.user.next(this.state.a)
    this.userdetails.next(this.state.b)
    this.token = this.tok.get
  }

  store(user)
  {
    this.state.loggedIn.next(true)
    this.tok.handle(user.token);
    this.state.setUser(user) 
    this.user.next(user.user)
    this.userdetails.next(user.userdetails)
 
  }
}
