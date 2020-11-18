import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { SessionService } from '../session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataDialogOverviewComponent } from 'assets/examples/material/data-dialog/data-dialog-overview/data-dialog-overview.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-signup4',
  templateUrl: './signup4.component.html',
  styleUrls: ['./signup4.component.scss'],
  animations: egretAnimations
})
export class Signup4Component implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private api: SessionService,
    private router: Router,
    private toastr: ToastrService,
    private loader: AppLoaderService) {}

  ngOnInit() {

    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = this.fb.group(
      {
        name: ["",Validators.required],
        email: ["",[Validators.required,Validators.email]],
        password: password,
        agreed: [false,Validators.required],
        location: ["",Validators.required],
        usertype:["", Validators.required],
        passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
        phone:    ['', [Validators.required, Validators.pattern(new RegExp("[0-9]{10}")) ]],
      }
    );
  }

  onSubmit(value) {
    if(value.usertype ==='publisher'){
      this.publisher(value)
    }
    if(value.usertype ==='agent'){
      this.agent(value)
    }
    if(value.usertype ==='retail'){
      this.retail(value)
    }
     
  }
  
  publisher(value){
    this.loader.open(); 
    this.api.registerPublisher(value).subscribe((response)=>{  
      this.toastr.success('success', 'Pending Approval from Ghana Book Store...Await Text Message')
      this.router.navigate(['']);
      this.loader.close();
  },(errorResponse: HttpErrorResponse) =>{
    this.loader.close();
        if(errorResponse.error.validation_error){ 
          this.onError(errorResponse) 
      }else{
          this.toastr.error(errorResponse.error)
      }
  })
  }
  agent(value){
    this.loader.open(); 
    this.api.registerAgent(value).subscribe((response)=>{  
      this.toastr.success('success', 'User Registration Successful')
      this.router.navigate(['/sessions/signin4']);
      this.loader.close();
  },(errorResponse: HttpErrorResponse) =>{
    this.loader.close();
        if(errorResponse.error.validation_error){ 
          this.onError(errorResponse) 
      }else{
          this.toastr.error(errorResponse.error)
      }
  })
  }
  retail(value){
    this.loader.open(); 
    this.api.registerRetail(value).subscribe((response)=>{  
      this.toastr.success('success', 'Registration successful')
      this.router.navigate(['/sessions/signin4']);
      this.loader.close(); 
  },(errorResponse: HttpErrorResponse) =>{
    this.loader.close();
        if(errorResponse.error.validation_error){ 
          this.onError(errorResponse) 
      }else{
          this.toastr.error(errorResponse.error)
      }
  })
  }
  onError(error){
    if (error.error.validation_error){
        if(error.error.validation_error.name){
            this.toastr.error('name',error.error.validation_error.name[0])
        }
        if(error.error.validation_error.email){
            this.toastr.error('email',error.error.validation_error.email[0])
        }
        if(error.error.validation_error.password){
            this.toastr.error('password', error.error.validation_error.password[0])
        }
        if(error.error.validation_error.phone){
            this.toastr.error('phone',error.error.validation_error.phone[0])
        }
    }
}

}
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
      return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ( password.value === passwordConfirm.value )
  {
      return null;
  }

  return {passwordsNotMatching: true};
};

