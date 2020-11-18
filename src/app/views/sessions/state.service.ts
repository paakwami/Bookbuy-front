import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../../views/sessions/token.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/data/data.service';
// import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private baseurl = 'https://vast-tundra-41801.herokuapp.com/'

  user: BehaviorSubject<any>;
  status;
  role = {admin: false,publisher:false, agent:false,};
  a;
  b;
  num; 
  order;

  //states: Role = this.roles;


  loggedIn = new BehaviorSubject <boolean>(this.token.loggedIn())
  authStatus = this.loggedIn.asObservable();
  
  changeAuthStatus(value: boolean){
    this.loggedIn.next(value);
  }

  constructor(private token: TokenService, private http: HttpClient, private router: Router) {
    
    this.user = new BehaviorSubject({})
    this.loggedIn.subscribe((a)=>this.status = a)
    if(this.token.loggedIn()){
      this.getUser();
    }
   }

   getUser(){
       this.user.next(JSON.parse(localStorage.getItem('user')))
        this.a = JSON.parse(localStorage.getItem('user'))
        this.fix(this.a, this.a.roles)
      }
          
 
   setUser(data){
    localStorage.setItem('user', JSON.stringify(data.user));
    this.user.next(data.user)
    this.fix(data.user, data.roles)
  }

  fix(user, roles){
    if (user.role =='agent'){
      this.role.agent = true
    }
    if(user.role =='publisher'){
      this.roleFix(roles)
    }
  }
  signOut(){
    localStorage.clear()
    this.loggedIn.next(false)
  }

  roleFix(usertype){
    this.num = Object.keys(usertype).length
      this.multipleRole(this.num, usertype)
  }

  multipleRole(a,b){
  for(a in b){
    this.set(b[a])
  }
  }

  set(data){
    if(data.slug == 'admin'){
      this.role.admin = true
    }
    if(data.slug == 'publisher'){
      this.role.publisher = true
    }
    if(data.slug == 'agent'){
      this.role.agent = true
    }
  }

}
