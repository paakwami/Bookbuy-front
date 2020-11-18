import { Component, OnInit, OnDestroy} from '@angular/core';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NewInventoryPopupComponent } from './Invoice/new-inventory-popup/new-inventory-popup.component';
import { AddStockPopupComponent } from './Invoice/add-stock-popup/add-stock-popup.component';
import { AddClassPopupComponent } from './Invoice/add-class-popup/add-class-popup.component';
import { AddSubjectPopupComponent } from './Invoice/add-subject-popup/add-subject-popup.component';
import { ToastrService } from 'ngx-toastr';
import { RequestAgentPopupComponent } from './Invoice/request-agent-popup/request-agent-popup.component';
import { StateService } from 'app/views/sessions/state.service';
import { TokenService } from 'app/views/sessions/token.service';
import { RespondRequestPopupComponent } from './Invoice/respond-request-popup/respond-request-popup.component';
import { ApiService } from 'app/shared/services/api.service';
import { RequestPublisherPopupComponent } from './Invoice/request-publisher-popup/request-publisher-popup.component';
import { DataService } from 'app/shared/data/data.service';
import { RespondPublisherComponent } from './Invoice/respond-publisher/respond-publisher.component';
import { AddpaymentMethodPopupComponent } from './Invoice/addpayment-method-popup/addpayment-method-popup.component';
import { AddRetailerPopupComponent } from './Invoice/add-retailer-popup/add-retailer-popup.component';
import { AddGroupPopupComponent } from './Invoice/add-group-popup/add-group-popup.component';
@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css'],
  animations: egretAnimations
})
export class PublisherComponent implements OnInit, OnDestroy {

  user;
  userdetails;
  role;
 
  public learnerstages: any[];
  public sendrequest: any[];
  public subjects: any[];
  public items: any[];
  public publishers: any[];
  public agents: any[];
  public partners: any[];
  public pendingpublishers: any[];
  public paymentmethods: any[];
  public retailers: any[];
  public stocks: any[];
  public approvedpartners: any[];
  public classgroup: any[];

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: ApiService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private toastr: ToastrService,
    private state: StateService,
    private data: DataService,
    
  ) { 
    this.role = this.state.role
    this.state.user.subscribe((a)=>{this.user = a})
    this.userdetails = this.data.userdetails;
  }

  ngOnInit() {
    this.getLearnerstage()
    this.getSubject()
    this.getItems() 
    this.getPublishers();
    this.getPartners();
    this.getAgents();
    this.getPendingPublishers();
    this.getPaymentMethods();
    this.getRetailers();
    this.getStocks();
    this.getClassGroups();
  }
  ngOnDestroy() {
  } 
  loading(data){
    if(data){
      
    }

  }
  getStocks(){
    this.stocks = this.data.stocks;
  }

  getRetailers(){
    this.retailers = this.data.retailers;
  }

  getPartners(){
    this.partners = this.data.partners;
  }
  getPaymentMethods(){
    this.paymentmethods = this.data.paymentmethods;
  }
  getPendingPublishers(){
    this.pendingpublishers = this.data.pendingPublishers;
  }

  getSubject(){
    this.subjects = this.data.subjects;
  } 
 
  getLearnerstage(){
    this.learnerstages = this.data.learnerstages;
    } 
  getItems() {
    this.items = this.data.items;
  }
  getPublishers(){
    this.publishers = this.data.publishers;
    }

  getAgents(){
    this.agents = this.sendrequest =  this.data.agents;
  }
  getClassGroups(){
    this.classgroup = this.data.classgroup;
  }

  openAddClass(data: any = {}, isNew?) {
    let title = isNew ? 'Add Class' : 'Update Class';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddClassPopupComponent, {
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
          this.crudService.addClass(res)
            .subscribe(data => {
              this.learnerstages = this.learnerstages.concat([data]);
              this.data.learnerstages = this.learnerstages;
              this.loader.close();
              this.snack.open('New Class Added!', 'OK', { duration: 4000 })
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  openAddPaymentMethod(data: any = {}, isNew?) {
    let title = isNew ? 'Add Class' : 'Update Class';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddpaymentMethodPopupComponent, {
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
          this.crudService.addPaymentMethod(res)
            .subscribe(data => {
              this.paymentmethods = this.paymentmethods.concat([data]);
              this.data.paymentmethods = this.paymentmethods
              this.loader.close();
              this.snack.open('New Payment Method Added!', 'OK', { duration: 4000 })
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
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
          this.crudService.agentAddRetailer(res)
            .subscribe(data => {
              this.retailers = this.retailers.concat([data]);
              this.data.retailers = this.retailers
              this.loader.close();
              this.snack.open('New Retailer Added!', 'OK', { duration: 4000 })
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  openAddSubject(data: any = {}, isNew?) {
    let title = isNew ? 'Add Class' : 'Update Class';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddSubjectPopupComponent, {
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
          this.crudService.addSubject(res)
            .subscribe(data => {
              this.subjects = this.subjects.concat([data]);
              this.data.subjects = this.subjects;
              this.loader.close();
              this.snack.open('New Subject Added!', 'OK', { duration: 4000 })
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  openAddInventory(data: any = {}, isNew?) {
    let title = isNew ? 'Add New Inventory' : 'Update Inventory';
    let dialogRef: MatDialogRef<any> = this.dialog.open(NewInventoryPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { subjects: this.subjects, learnerstages: this.learnerstages }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.addItem(res)
            .subscribe(data => {
              this.items = this.items.concat([data]);
              this.data.items = this.items;
              this.loader.close();
              this.snack.open('New Item Added', 'OK', { duration: 4000 })
            },
            error=>{
              this.loader.close();
              this.toastr.error('sorry', error.error)})
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  openAddStock(data: any = {}, isNew?) {
    let title = isNew ? 'Add New Stock' : 'Update member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddStockPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { items: this.items}
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.addStock(res)
            .subscribe(data => {
              this.items = this.items.filter(function(element) {return element.id !== data.id;});
              this.items = this.items.concat([data]);
              this.data.items = this.items;
              this.loader.close();
              this.snack.open('Stock Added', 'OK', { duration: 4000 })
            }, error=>{
              this.loader.close();
              this.toastr.error('Sorry', error.error)
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  openAddClassGroup(data: any = {}, isNew?) {
    let title = isNew ? 'Add New Class Group' : 'Update member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AddGroupPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { learnerstages: this.learnerstages}
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.addgroup(res)
            .subscribe(data => {
              this.classgroup = this.classgroup.concat([data.data]);
              this.data.classgroup = this.classgroup;
              this.loader.close();
              this.snack.open('Class Group Added', 'OK', { duration: 4000 })
            }, error=>{
              this.loader.close();
              this.toastr.error('Sorry', error.error)
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  filterAgents(blist: any, remove:any){
  var b = JSON.stringify(blist);
  var list = JSON.parse(b);
  for( var i = list.length - 1; i>=0; i--){
    for( var j=0; j<remove.length; j++){
      if(list[i] && list[i].id === remove[j].id){
        list.splice(i, 1);
      }
    }
  }    
     return list;
  }
  requestAgent(data: any = {}, isNew?) {
    let title = isNew ? 'Request to Sell for an Agent' : 'Update member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(RequestAgentPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { agents: this.filterAgents(this.agents , this.partners)},
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return; 
        }
        this.loader.open();
        if (isNew) {
          this.crudService.userRequest(res)
            .subscribe(data => {
              this.loader.close();
              this.partners = this.partners.concat([data.partner])
              this.data.partners = this.partners
              this.toastr.success('Success', data.message)
            }, error=>{
              this.loader.close();
              this.toastr.error('Sorry', error.error)
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  requestPublisher(data: any = {}, isNew?) {
    let title = isNew ? 'Request for an Agent to Sell Your Stock' : 'Update member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(RequestPublisherPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { publishers: this.filterAgents(this.publishers, this.partners)}
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.userRequest(res)
            .subscribe(data => {
              this.loader.close();
              this.partners = this.partners.concat([data.partner])
              this.data.partners = this.partners
              this.toastr.success('Success', data.message)
            }, error=>{
              this.loader.close();
              this.toastr.error('Sorry', error.error)
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  respondRequest(data) {
        let title ='Respond to request';
    let dialogRef: MatDialogRef<any> = this.dialog.open(RespondRequestPopupComponent, {
      width: '720px',
      disableClose: true,
      data: {user: data}
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
          this.crudService.respondRequest(res)
            .subscribe(data => {
              this.loader.close();
              this.partners = this.partners.filter(function(element) {return element.id !== data.id;});
              this.partners = this.partners.concat([data]);
              this.data.partners = this.partners;
              this.data.approvedpartners = this.data.approvedpartners.concat([data])
              }, error=>{
              this.loader.close();
              console.log(data)
              //this.toastr.error('Sorry', error.error)
            })
     
      })
  }
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.removeItem(row)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member deleted!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  respondPublisher(data) {
    let title ='Respond to request';
    let dialogRef: MatDialogRef<any> = this.dialog.open(RespondPublisherComponent, {
      width: '480px',
      disableClose: true,
      data: {user: data}
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return; 
        }
        this.loader.open();
          this.crudService.respondPendingPublisher(res)
            .subscribe(data => {
              this.loader.close();
              this.pendingpublishers = this.pendingpublishers.filter(function(element) {return element.id !== data.id;});
              this.data.pendingPublishers = this.pendingpublishers
              this.toastr.success('success', 'Publisher has been Approved')
            }, error=>{
              this.loader.close();
              //this.toastr.error('Sorry', error.error)
            })
     
      })
  }

}
