import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-class-popup',
  templateUrl: './add-class-popup.component.html',
})
export class AddClassPopupComponent implements OnInit {

  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddClassPopupComponent>,
    private fb: FormBuilder,
  ) { }
 
  ngOnInit() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
    })
    
  }
  
    
  

  submit() {
    console.log(this.itemForm.value)
    this.dialogRef.close(this.itemForm.value)
  }

}