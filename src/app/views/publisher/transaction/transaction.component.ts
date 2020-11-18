import { Component, OnInit, OnDestroy} from '@angular/core';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { StateService } from 'app/views/sessions/state.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import {DataService} from 'app/shared/data/data.service';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { ToastrService } from 'ngx-toastr';
import { TablesService } from 'app/shared/services/tables.service';
import { RequestAgentPopupComponent } from 'app/views/profile/publisher/Invoice/request-agent-popup/request-agent-popup.component';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  animations: egretAnimations
})
export class TransactionComponent implements OnInit, OnDestroy {

  user;
  userdetails;
  role;
  
  public partners: any[];
  public agents: any[];
  public approvedpartners: any[];
 

  rows = [];
  columns = [];
  temp = [];

  constructor(
    private dialog: MatDialog,
    private data: DataService,
    private state: StateService,
    private service: TablesService,
    private router: Router,
    private crudService: ApiService,
    private loader: AppLoaderService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.initData()
    this.columns = this.service.getDataConf();
  }

  initData(){
    this.role = this.state.role
    this.state.user.subscribe((a)=>{this.user = a})
    this.approvedpartners =  this.rows = this.temp = this.data.pubinit.data.approvedpartners[0]
    this.agents = this.data.pubinit.data.agents[0];
    this.userdetails = this.data.userdetails;
  }
  ngOnDestroy() {

  } 
 
  onActivate(event) {
    if(event.type == 'click') {
        this.data.selectedagent = event.row
        this.router.navigate(['/invoice/agentsummary'])
    } 
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
    let title = isNew ? 'Ask an Agent to Sell For You' : 'Update member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(RequestAgentPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { agents: this.filterAgents(this.agents , this.approvedpartners)}
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
              this.approvedpartners = this.approvedpartners.concat([data.approvedpartners])
              this.data.approvedpartners = this.approvedpartners
              this.toastr.success('Success', data.message)
            }, error=>{
              this.loader.close();
              this.toastr.error('Sorry', error.error)
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              //this.items = data;
              this.loader.close();
              //this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }

}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-transation',
//   templateUrl: './transation.component.html',
//   styleUrls: ['./transation.component.css']
// })
// export class TransationComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
