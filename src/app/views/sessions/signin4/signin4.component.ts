import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { SessionService } from '../session.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-signin4',
  templateUrl: './signin4.component.html',
  styleUrls: ['./signin4.component.scss'],
  animations: egretAnimations
})
export class Signin4Component implements OnInit {

  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: SessionService,
    private toastr: ToastrService,
    private router: Router,
    private user: UserService,
    private loader: AppLoaderService) {}

  ngOnInit() {

    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signinForm = this.fb.group(
      {
        phone:    ['', [Validators.required, Validators.pattern(new RegExp("[0-9]{10}")) ]],
        password: ['', Validators.required]
      } 
    );
  }

  onSubmit(value){
    this.loader.open(); 
    this.api.signin(value).subscribe((response: any)=>{  
        this.toastr.success('success', 'You are now logged in!')
        this.user.store(response) 
        this.redirect(response.user)
        this.loader.close()
    },(errorResponse: HttpErrorResponse) =>{
        if(errorResponse.error.credential_error){
          this.loader.close()
            this.onError(errorResponse.error.credential_error)
        }else{
          this.loader.close()
            this.toastr.error(errorResponse.error)
        } 
    })  
}
onError(error){
            this.toastr.error('Login Details',error)
}

redirect(userdetails){
  if(this.user.order){
    if(userdetails.role === 'retailer'){
      this.router.navigate(['/myshop/checkout']);
    }
  }else{
    if(userdetails.role === 'publisher'||userdetails.role === 'admin'||userdetails.role === 'agent'){
      this.router.navigate(['/profile/overview']);
    } 
    if(userdetails.role === 'retailer'){
      this.router.navigate(['/myshop']);
    }
  }
}

}
