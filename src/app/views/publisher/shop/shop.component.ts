import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DataService } from 'app/shared/data/data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  animations: egretAnimations
})
export class ShopComponent implements OnInit {

  publisherServe;
  constructor(
    public data: DataService
  ) { }

  ngOnInit(): void {
    this.publisherServe = this.data.publisherServe.data
    console.log(this.publisherServe)
  }

}
