import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-subject-popup',
  templateUrl: './add-subject-popup.component.html',
})
export class AddSubjectPopupComponent implements OnInit {

  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddSubjectPopupComponent>,
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

// import { Component, OnInit } from '@angular/core';

// @Component({

// })
// export class AddSubjectPopupComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
