import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-inventory-popup',
  templateUrl: './new-inventory-popup.component.html'
})
export class NewInventoryPopupComponent implements OnInit {
 
  subjects: any[];
  learnerstages: any[];
  
  public itemForm: FormGroup;
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewInventoryPopupComponent>,
    private fb: FormBuilder,
  ) { }
 
  ngOnInit() {
    this.subjects = this.data.subjects
    this.learnerstages = this.data.learnerstages

    
      this.itemForm = this.fb.group({
        name: ['', Validators.required],
        subject_id: ['', Validators.required],
        learner_stage_id: ['', Validators.required],
        edition: ['', Validators.required],
        price: ['', Validators.required],
        stock: ['', Validators.required],
      })
    
    
  }
 

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
