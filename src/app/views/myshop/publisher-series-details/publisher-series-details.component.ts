import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { Item } from 'app/shared/models/item.model';
import { Subscription } from 'rxjs';
import { CartItem, ShopdataService } from '../shopdata.service';

@Component({
  selector: 'app-publisher-series-details',
  templateUrl: './publisher-series-details.component.html',
  styleUrls: ['./publisher-series-details.component.css'],
  animations: [egretAnimations]
})
export class PublisherSeriesDetailsComponent implements OnInit {

  public itemID;
  public Item: Item;
  public quantity: number = 1;
  public cart: CartItem[];
  public cartData: any;
  private productSub: Subscription;
  public selectedseries: any;
  public selectedItem: any;


  constructor(
    private shopdata: ShopdataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private shopService: ShopdataService
  ) { }

  ngOnInit(): void {
    this.selectedseries = this.shopdata.selectedseries[0]
    this.initGallery()
    this.getCart();
    this.cartData = this.shopService.cartData;
  }


  getCart() {
    this.shopdata
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    })
  }
  addToCart() {
    let cartItem: CartItem = {
      product: this.Item,
      data: {
        quantity: this.quantity,
      }
    };


    this.shopdata
    .addToCart(cartItem)
    .subscribe(res => {
      this.cart = res;
      this.quantity = 1;
      this.snackBar.open('Product added to cart', 'OK', { duration: 4000 });
    })
  }  

  initGallery() {
    if(!this.selectedseries) {
      return;
    }
    this.selectedseries = this.selectedseries.map(i => {
      return {
        all: i,
        state: '0'
      }
    });
    if (this.selectedseries[0])  {
      this.selectedseries[0].state = '1';
      this.selectedItem = this.selectedseries[0]
      this.Item = this.selectedItem.all;
      
    }
  }
  selectItem(item){
    this.changeState(item)
   this.changeCartItem(item.all)
  }

  changeState(photo) {
    if (photo.state === '1') {
      return;
    }
    this.selectedseries = this.selectedseries.map(p => {
      if (photo.all === p.all) {
        setTimeout(() => {
          p.state = '1';
          return p;
        }, 290)
      }
      p.state = '0';
      return p;
    })
  }

  changeCartItem(item){
    if(this.Item === item){
      return;
    }
    this.Item = item
  }

  toSeries(){
    this.shopdata.going.series = true
    this.shopdata.going.books = false
    this.router.navigate(['/myshop'])
    

  }
  
}
