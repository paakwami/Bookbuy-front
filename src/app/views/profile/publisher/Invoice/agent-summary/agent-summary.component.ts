import { Component, OnInit } from '@angular/core';
import { AgentSummaryService } from './agent-summary.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'app/shared/services/api.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { MakepaymentPopupComponent } from '../makepayment-popup/makepayment-popup.component';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { ToastrService } from 'ngx-toastr';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DataService } from 'app/shared/data/data.service';

@Component({
  selector: 'app-agent-summary',
  templateUrl: './agent-summary.component.html',
  styleUrls: ['./agent-summary.component.css'],
  animations: egretAnimations
})
export class AgentSummaryComponent implements OnInit {

  selectedagent 
  paymentmethods: any[];
  payments: any[];
  agentdetails;
  pop;
  lastpayment;
  lastinvoice;

  constructor(
    private agent: AgentSummaryService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: ApiService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private data: DataService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.selectedagent = this.agent.selectedagent
    this.paymentmethods = this.agent.paymentmethods
    this.payments = this.agent.payments
    this.agentdetails = this.agent.agentdetails
    
  
     this.pop = this.agent.agentdetails
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
    let dialogRef: MatDialogRef<any> = this.dialog.open(MakepaymentPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { paymentmethods: this.paymentmethods, selectedagent: this.selectedagent }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.addPayments(res)
            .subscribe(data => {
              this.loader.close();
              this.payments = this.payments.concat([data.payment]);
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
