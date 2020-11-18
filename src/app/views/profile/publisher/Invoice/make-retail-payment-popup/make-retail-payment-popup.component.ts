import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-make-retail-payment-popup',
  templateUrl: './make-retail-payment-popup.component.html',
  styleUrls: ['./make-retail-payment-popup.component.css']
})
export class MakeRetailPaymentPopupComponent implements OnInit {

  paymentmethods: any[];
  payments: any[];
  selectedretail;
  
  public itemForm: FormGroup;
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MakeRetailPaymentPopupComponent>,
    private fb: FormBuilder,
  ) { }
 
  ngOnInit() {
    this.paymentmethods = this.data.paymentmethods;
    this.selectedretail = this.data.selectedretail;

    
      this.itemForm = this.fb.group({
        amount: ['', Validators.required],
        payment_method_id: ['', Validators.required],
        retail_id: this.selectedretail.id,
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

// import { Component, OnInit } from '@angular/core';

// @Component({

// })
// export class MakeRetailPaymentPopupComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
