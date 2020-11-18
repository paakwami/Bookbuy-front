import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-request-agent-popup',
  templateUrl: './request-agent-popup.component.html',
})
export class RequestAgentPopupComponent implements OnInit {

  agents;
  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RequestAgentPopupComponent>,
    private fb: FormBuilder,
  ) { } 

  ngOnInit() {
    this.agents = this.data.agents;

    this.itemForm = this.fb.group({
      id: ['', Validators.required],
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}


// import { Component, OnInit } from '@angular/core';

// @Component({

//   styleUrls: ['./request-agent-popup.component.css']
// })
// export class RequestAgentPopupComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
