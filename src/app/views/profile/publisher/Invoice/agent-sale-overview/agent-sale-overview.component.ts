import { Component, OnInit, OnDestroy} from '@angular/core';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { StateService } from 'app/views/sessions/state.service';
import { TokenService } from 'app/views/sessions/token.service';
import { ApiService } from 'app/shared/services/api.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import {DataService} from 'app/shared/data/data.service';
import { AgentSummaryService } from '../agent-summary/agent-summary.service';
import { Router } from '@angular/router';
import { AgentViewService } from './agentview.service';
import { AddRetailerPopupComponent } from '../add-retailer-popup/add-retailer-popup.component';
import { AgentSaleOverviewService } from './agent-sale-overview.service';
import { RetailSummaryService } from '../retail-summary/retail-summary.service';


@Component({
  selector: 'app-agent-sale-overview',
  templateUrl: './agent-sale-overview.component.html',
  styleUrls: ['./agent-sale-overview.component.css'],
  animations: egretAnimations
})
export class AgentSaleOverviewComponent implements OnInit, OnDestroy {

  user;
  userdetails;
  role;
  otherdetails;
  lastinvoice;
  lastpayment;

  public retailers: any[];


  rows = [];
  columns = [];
  temp = [];

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: ApiService,
    private loader: AppLoaderService,
    private state: StateService,
    private toastr: ToastrService,
    private service: AgentViewService,
    private agent: AgentSaleOverviewService,
    private data: DataService,
    private router: Router,
    private retail: RetailSummaryService,
  ) { 
    this.role = this.state.role
    this.state.user.subscribe((a)=>{this.user = a})
    this.userdetails = this.data.userdetails.details
    this.otherdetails = this.data.userdetails
  }

  ngOnInit() {
    this.getPartners();
    this.columns = this.service.getDataConf();
    this.rows = this.temp = this.retailers;
    this.lastinvoice = this.otherdetails.invoices
    this.lastpayment = this.otherdetails.payments
    this.lastinvoice = this.lastinvoice[this.lastinvoice.length-1]
    this.lastpayment = this.lastpayment[this.lastpayment.length-1]
  }
  ngOnDestroy() {
    
  } 

  onActivate(event) {
    if(event.type == 'click') {
        this.agent.selectedretailer = this.retail.selectedretailer = this.data.selectedretailer = event.row
        this.router.navigate(['/invoice/retailsummary'])
    } 
}

  getPartners(){
   this.retailers = this.data.retailers
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);

    // console.log(columns);
    if (!columns.length)
      return;

    const rows = this.temp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    this.rows = rows;

  }

  addRetailer(data: any = {}, isNew?) {
    let title = isNew ? 'Add Retailer' : 'Update Class';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddRetailerPopupComponent, {
      width: '720px',
      disableClose: true,
      // data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        } 
        this.loader.open();
        if (isNew) {
          this.crudService.addRetailer(res)
            .subscribe(data => {
              this.retailers = this.retailers.concat([data]);
              this.rows = this.temp = this.data.retailers = this.retailers
              this.loader.close();
              this.snack.open('New Retailer Added!', 'OK', { duration: 4000 })
            },
            error=> {
              this.loader.close();
              this.toastr.error(error.error, 'error occured')
              this.snack.open('An error occured, Retailer not created', 'OK',{duration:4000})
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.retailers = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }

}