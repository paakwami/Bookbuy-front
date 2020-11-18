import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { ApiService } from 'app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AgentSummaryService } from '../agent-summary/agent-summary.service';
import { DataService } from 'app/shared/data/data.service';
import { StateService } from 'app/views/sessions/state.service';

@Component({
  selector: 'app-pre-invoice',
  templateUrl: './pre-invoice.component.html',
  styleUrls: ['./pre-invoice.component.css'],
  animations: egretAnimations
})
export class PreInvoiceComponent implements OnInit {

  role;
  items;
  totalsale;
  afterdiscount;
  sold;
  count = 0
  invoicenumber;
  agreed = false;
  currentDate = new Date();
  constructor(private loader: AppLoaderService,
    private crudService: ApiService,
    private state: StateService,
    private toastr: ToastrService,
    private agent: AgentSummaryService,
    private data: DataService ) {
    
   }

  ngOnInit(): void {
    this.items = this.data.newsaledata;
    this.getAll()
    this.role = this.data.role;
  }

  getAll() {
    this.sold = this.items.tickets
    const discount = this.items.discount
    this.totalsale = 0
    for (var i = 0, length = this.sold.length; i < length; i++) {
        this.totalsale = this.totalsale + (this.sold[i].item.price * this.sold[i].quantity)
      }
    
      this.afterdiscount = this.totalsale * (1-(discount/100))
  }

  createSale(){
    this.loader.open();
    this.crudService.createSale(this.items)
    .subscribe(response=>{
      this.loader.close(),
      this.invoicenumber = response.invoicenumber,
      this.agreed = true;
      this.toastr.success('succes', 'Invoice Created')
      }, 
      error=>{this.loader.close(), this.toastr.error('error', error.error)})
    
  }  
  agentCreateSale(){
    this.loader.open();
    this.crudService.agentCreateSale(this.items)
    .subscribe(response=>{
      this.loader.close(),
      this.invoicenumber = response.invoice.invoicenumber,
      this.data.userdetails(response.userdetails),
      this.agreed = true;
      this.toastr.success('succes', 'Invoice Created')
      }, 
      error=>{this.loader.close(), this.toastr.error('error', error.error)})
    
  }  

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}
