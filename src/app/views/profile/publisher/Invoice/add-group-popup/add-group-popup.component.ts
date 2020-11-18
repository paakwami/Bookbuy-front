import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-group-popup',
  templateUrl: './add-group-popup.component.html',
})
export class AddGroupPopupComponent implements OnInit {
 
  checked: any[];
  learnerstages: any[];
  
  public itemForm: FormGroup;
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddGroupPopupComponent>,
    private fb: FormBuilder,
  ) { }
 
  ngOnInit() {
    this.learnerstages = this.data.learnerstages
    this.checked = [];
    
      this.itemForm = this.fb.group({
        name: ['', Validators.required],
        class: [this.checked]
   
      })
    
  }

  onChange(event, learn){
    if(event.checked){
      this.checked.push(learn)
    }
    if(!event.checked){
      this.checked = this.checked.filter(function(element) {return element.id !== learn.id;});
    }

  }
 

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}


// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-add-group-popup',
//   templateUrl: './add-group-popup.component.html',
//   styleUrls: ['./add-group-popup.component.css']
// })
// export class AddGroupPopupComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
