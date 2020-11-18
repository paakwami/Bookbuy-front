import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-request-publisher-popup',
  templateUrl: './request-publisher-popup.component.html',
})
export class RequestPublisherPopupComponent implements OnInit {

  publishers;
  user;
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RequestPublisherPopupComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.publishers = this.data.publishers;
    this.user = this.data.user;

    this.itemForm = this.fb.group({
      id: ['', Validators.required],
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
