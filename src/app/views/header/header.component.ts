import { Component, OnInit, HostListener, HostBinding, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW_PROVIDERS, WINDOW } from '../../shared/helpers/window.helper';
import { Router } from '@angular/router';
import { StateService } from '../sessions/state.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isFixed;
  loggedin: boolean = false;
  user;
  constructor(
    private router: Router,
    private profile: ProfileService,
    public state: StateService,
    // @Inject(DOCUMENT) private document: Document,
    // @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit() {
    this.state.loggedIn.subscribe(
      a => this.loggedin = a
    )
  } 
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset =10;
    // const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if(offset > 10) {
      this.isFixed = true
    } else {
      this.isFixed = false;
    }
  }

  @HostBinding("class.menu-opened") menuOpened = false;

  toggleMenu() {
    this.menuOpened = !this.menuOpened
  }

  buyEgret() {
    // this.window.open('https://themeforest.net/item/egret-angular-4-material-design-admin-template/20161805?ref=mh_rafi');
  }

}
