import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-retailer-popup',
  templateUrl: './add-retailer-popup.component.html',
  styleUrls: ['./add-retailer-popup.component.css']
})
export class AddRetailerPopupComponent implements OnInit {

  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddRetailerPopupComponent>,
    private fb: FormBuilder,
  ) { }
 
  ngOnInit() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      phone:    ['', [Validators.required, Validators.pattern(new RegExp("[0-9]{10}")) ]],
      location: ['', Validators.required],
    })
    
  }
  
    
  

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
