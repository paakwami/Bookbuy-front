import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { ApiService } from 'app/shared/services/api.service';
import { TablesService } from 'app/shared/services/tables.service';

@Component({ 
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css']
})
export class ProfileOverviewComponent implements OnInit, OnDestroy {
 
  public items: any[];
  public getItemSub: Subscription;

  rows = [];
  columns = [];

  constructor(private table: TablesService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private api: ApiService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService) { }

  ngOnInit() {
    this.columns = this.table.getDataConf();
    this.rows = this.table.getAll();
    this.getItems() 
  } 
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    this.getItemSub = this.api.getItems()
      .subscribe(data => {
        this.items = data;
      })
  } 

}
