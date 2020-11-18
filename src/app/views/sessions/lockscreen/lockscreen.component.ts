import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  roleForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.roleForm = this.fb.group(
      {
        role: ['', Validators.required]
      }
    );
  }

  unlock() {
  
    this.submitButton.disabled = true;

  }
}
