import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/shared/services/api.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { ToastrService } from 'ngx-toastr';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AgentSaleOverviewService } from '../agent-sale-overview/agent-sale-overview.service';
import { RetailSummaryService } from './retail-summary.service';
import { MakeRetailPaymentPopupComponent } from '../make-retail-payment-popup/make-retail-payment-popup.component';
import { StateService } from 'app/views/sessions/state.service';
import { DataService } from 'app/shared/data/data.service';

@Component({
  selector: 'app-retail-summary',
  templateUrl: './retail-summary.component.html',
  styleUrls: ['./retail-summary.component.css'],
  animations: egretAnimations
})
export class RetailSummaryComponent implements OnInit {

  selectedretailer
  retailerdetails
  lastpayment;
  lastinvoice;
  pop;
  paymentmethods: any[];
  payments: any[];

  constructor(
    private agent: AgentSaleOverviewService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: ApiService,
    private data: DataService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private toastr: ToastrService,
    private retail: RetailSummaryService) { }

  ngOnInit(): void {
    this.selectedretailer = this.retail.selectedretailer
     this.paymentmethods = this.retail.paymentmethods
     this.retailerdetails = this.retail.retailerdetails
     this.pop = this.retail.retailerdetails
     this.lastpayment = this.pop.payments
     this.lastinvoice = this.pop.invoices
     this.lastinvoice = this.lastinvoice[this.lastinvoice.length-1]
     this.lastpayment = this.lastpayment[this.lastpayment.length-1]
    
  } 

  getRowClass = (row) => {    
    return {
      'unpaid': row.completed == "0",
      'paid': row.completed == "1",
    };
   }
 
  openMakePayment(data: any = {}, isNew?) {
    let title = isNew ? 'Make Payment' : 'Update Inventory';
    let dialogRef: MatDialogRef<any> = this.dialog.open(MakeRetailPaymentPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { paymentmethods: this.paymentmethods, selectedretail: this.selectedretailer }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return; 
        }
        this.loader.open();
        if (isNew) {
          this.crudService.addRetailPayments(res)
            .subscribe(data => {
              this.loader.close();
              this.retailerdetails.payments = this.retailerdetails.payments.concat([data.payment]);
              this.data.userdetails = data.userdetails;
              this.snack.open('New Payment Made', 'OK', { duration: 4000 })
            },
            error=>{
              this.loader.close();
              this.toastr.error('sorry', error.error)})
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.payments = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }

}


// import { Component, OnInit } from '@angular/core';

// @Component({

// })
// export class RetailSummaryComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
