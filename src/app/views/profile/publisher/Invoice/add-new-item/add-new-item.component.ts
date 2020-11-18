import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddSeriesPopupComponent } from '../add-series-popup/add-series-popup.component';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/shared/services/api.service';
import { DataService } from 'app/shared/data/data.service';
import { Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css'],
  animations: [egretAnimations]
})
export class AddNewItemComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  basicForm: FormGroup;
  former: any;

  classgroups: any;
  subject: any;
  series: any;
  learnerstages: any;
  imageSrc: string;
  value: any;
  selectedfile: File;
  newf: any;
  


  constructor(  private dialog: MatDialog,
    private fb: FormBuilder,
    private loader: AppLoaderService, 
    private toastr: ToastrService,
    private snack: MatSnackBar,
    private crudService: ApiService,
    private data: DataService,
    private router: Router,) { }
 
  ngOnInit() {
    this.newf = new FormData()
    this.getClassgroup()
    this.getSubject()
    this.getSeries()
    this.getLearnerstages()

    this.firstFormGroup = this.fb.group({
      bookcategory: ['', Validators.required],
      series_id: ['', Validators.required],
    });

    this.secondFormGroup = this.fb.group({
      name: ['', Validators.required],
      learnerstage_id: ['', Validators.required],
      stock: [''],
      price: ['', Validators.required],
      sale: ['', Validators.required],
      edition: ['', Validators.required],
    });

  }
  getClassgroup(){
    this.classgroups = this.data.classgroup;
  }
  getSubject(){
    this.subject = this.data.subjects;
  }
  getSeries(){
    this.series = this.data.publisherseries;
  }
  getLearnerstages(){
    this.learnerstages = this.data.learnerstages;
  }
  
  //mystring = mystring.replace('/r','/');
  submit() {
    this.newf.append('name', this.secondFormGroup.value.name)
    this.newf.append('learnerstage_id', this.secondFormGroup.value.learnerstage_id)
    this.newf.append('stock', this.secondFormGroup.value.stock)
    this.newf.append('price', this.secondFormGroup.value.price)
    this.newf.append('sale', this.secondFormGroup.value.sale)
    this.newf.append('edition', this.secondFormGroup.value.edition)
    this.newf.append('series_id', this.firstFormGroup.value.series_id)
    this.newf.append('bookcategory', this.firstFormGroup.value.bookcategory)
    this.crudService.addItem(this.newf).subscribe((response: any)=>{
      this.loader.open()
      this.data.selectedproduct = response,
      this.adding(response),
      this.loader.close()
      this.toastr.success('Item Added Successfully')
      this.router.navigate(['invoice/showproduct']);
   })

  }
  adding(item){
    if(this.data.items){
      this.data.items.concat([item])
    }else{
      this.data.items = item
    }
  }

  onChange(event){
    this.former = event.value
  }
  
  get f(){

    return this.secondFormGroup.controls;

  }

  onFileChange(event) {
    this.selectedfile = event.target.files[0]
    this.newf.append('image', this.selectedfile)
  }

  openAddSeries(data: any = {}, isNew?) {
    let title = isNew ? 'Add New Class Group' : 'Update member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddSeriesPopupComponent, {
      width: '720px',
      disableClose: true, 
      data: { classgroup: this.classgroups, subjects : this.subject}
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.addSeries(res)
            .subscribe(data => {
              this.series = this.series.concat([data]);
              console.log(this.series)
              this.data.publisherseries = this.series;
              this.loader.close();
              this.snack.open('New Series Added', 'OK', { duration: 4000 })
            }, error=>{
              this.loader.close();
              this.toastr.error('Sorry', error.error)
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
}