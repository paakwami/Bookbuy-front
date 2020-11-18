import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-respond-publisher',
  templateUrl: './respond-publisher.component.html',
})
export class RespondPublisherComponent implements OnInit {

  user; 

  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RespondPublisherComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.user = this.data.user;

    this.itemForm = this.fb.group({
      publisher_id: [this.user.id ],
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}

// import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, Validators, FormGroup } from '@angular/forms';

// @Component({

// })
// export class RespondPublisherComponent implements OnInit {

//   user;

//   public itemForm: FormGroup;
//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     public dialogRef: MatDialogRef<RespondPublisherComponent>,
//     private fb: FormBuilder,
//   ) { }

//   ngOnInit() {
//     this.user = this.data.user;

//     this.itemForm = this.fb.group({
//       id: [this.user.id ],
//     })
//   }

//   submit() {
//     this.dialogRef.close(this.itemForm.value)
//   }

// }