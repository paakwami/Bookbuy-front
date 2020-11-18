import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DataService } from 'app/shared/data/data.service';
import { ApiService } from 'app/shared/services/api.service';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { RequestAgentPopupComponent } from 'app/views/profile/publisher/Invoice/request-agent-popup/request-agent-popup.component';
import { StateService } from 'app/views/sessions/state.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, concat} from 'rxjs';
import { OverviewService } from './overview.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: egretAnimations
})
export class OverviewComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: ApiService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private overview: OverviewService,
    private toastr: ToastrService,
    private data: DataService,
    private state: StateService
  ) { }
  
  user;
  pubInit
  partners
  item


  ngOnInit(): void {
    this.user = this.state.user.value
    
    this.getPub()
  }
  getPub()
  {
    this.pubInit = this.data.pubinit.data
    this.partners = this.pubInit.partners[0]
    this.item = this.pubInit.item[0]
  }
  requestAgent(data: any = {}, isNew?) {
    let title = isNew ? 'Request to Sell for an Agent' : 'Update member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(RequestAgentPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { agents: this.filterAgents(this.pubInit.agents[0] , this.pubInit.partners[0])},
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
              this.data.pubinit.partners[0] = this.partners
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
}
