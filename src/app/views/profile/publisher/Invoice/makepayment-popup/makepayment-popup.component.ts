import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-makepayment-popup',
  templateUrl: './makepayment-popup.component.html',
  styleUrls: ['./makepayment-popup.component.css']
})
export class MakepaymentPopupComponent implements OnInit {

  paymentmethods: any[];
  payments: any[];
  selectedagent;
  
  public itemForm: FormGroup;
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MakepaymentPopupComponent>,
    private fb: FormBuilder,
  ) { }
 
  ngOnInit() {
    this.paymentmethods = this.data.paymentmethods;
    this.selectedagent = this.data.selectedagent;

    
      this.itemForm = this.fb.group({
        amount: ['', Validators.required],
        payment_method_id: ['', Validators.required],
        agent_id: this.selectedagent.id,
      })
    
    
  }
 

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}


// import { Component, OnInit } from '@angular/core';

// @Component({

// })
// export class MakepaymentPopupComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
