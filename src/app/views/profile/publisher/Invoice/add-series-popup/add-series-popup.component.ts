import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-series-popup',
  templateUrl: './add-series-popup.component.html'
})
export class AddSeriesPopupComponent implements OnInit {
 
  subjects: any[];
  classgroups: any[];
  
  public itemForm: FormGroup;
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddSeriesPopupComponent>,
    private fb: FormBuilder,
  ) { }
 
  ngOnInit() {
    this.subjects = this.data.subjects
    this.classgroups = this.data.classgroup

    
      this.itemForm = this.fb.group({
        name: ['', Validators.required],
        classgroup_id: ['', Validators.required],
        subject_id: ['', Validators.required],
        seriesorsingle:true
       
      })
    
    
  }
 

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}


// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-add-series-popup',
//   templateUrl: './add-series-popup.component.html',
//   styleUrls: ['./add-series-popup.component.css']
// })
// export class AddSeriesPopupComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
