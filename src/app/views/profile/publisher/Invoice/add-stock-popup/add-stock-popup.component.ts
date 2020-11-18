import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-stock-popup',
  templateUrl: './add-stock-popup.component.html',
})
export class AddStockPopupComponent implements OnInit {

  items;
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddStockPopupComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.items = this.data.items;
    this.itemForm = this.fb.group({
      item_id: ['', Validators.required],
      added: ['', Validators.required],
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}