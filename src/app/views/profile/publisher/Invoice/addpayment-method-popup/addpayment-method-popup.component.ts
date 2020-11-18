import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addpayment-method-popup',
  templateUrl: './addpayment-method-popup.component.html',
  styleUrls: ['./addpayment-method-popup.component.css']
})
export class AddpaymentMethodPopupComponent implements OnInit {

  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddpaymentMethodPopupComponent>,
    private fb: FormBuilder,
  ) { }
 
  ngOnInit() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
    })
    
  }
  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}