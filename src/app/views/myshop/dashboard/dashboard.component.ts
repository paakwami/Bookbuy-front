import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DataService } from 'app/shared/data/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [egretAnimations]
})
export class DashboardComponent implements OnInit {

  orders;
  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public currentPage: any;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;

  constructor(
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.orders = this.data.orders
  }

  toggleSideNav() {
    this.sideNav.opened = !this.sideNav.opened;
  }

}
