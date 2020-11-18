import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { Publisher } from '../../../shared/models/publisher.model';
import { MyshopService } from '../myshop.service';
import { CartItem, ShopdataService } from '../shopdata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [egretAnimations]
})
export class ProductsComponent implements OnInit {
  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public currentPage: any;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;

  public publishers:any;
  public items: any = [];
  public series: any = [];
  public cart: CartItem[];
  public cartData: any;
  public bis;
  public pubSeries;
  selectedItem;
  going;

  constructor(
    private shopdata: ShopdataService,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
      
    this.bis = 'bookitems';
    this.publishers = this.shopdata.publishers
    this.getItems(this.publishers)

    this.getCart();
    this.cartData = this.shopdata.cartData;

    this.scan()
  }

  scan(){
    this.going = this.shopdata.going
    if(this.going.books){
      this.bookItems()
    }
    if(this.going.publisher){
      this.publisherSeries()
    }
    if(this.going.series){
      this.selectedPublisher(this.shopdata.selectedPublisher)
    }
  } 

  toggleSideNav() {
    this.sideNav.opened = !this.sideNav.opened;
  }

  bookItems(){  
    this.bis = 'bookitems'
   
  }
  selectedPublisher(val){
    this.shopdata.selectedPublisher = val
    this.bis = 'publisherseries'
    this.pubSeries = val.series[0]
  }

  publisherSeries(){
    this.bis = 'publisherdisplay'

  }
  selectedSeries(Ser){
    if(Ser.items[0].length === 0){
      this.snackBar.open('This publisher does not have any item under this Series', 'OK', { duration: 4000 });
    }else{
      this.shopdata.selectedseries = Ser.items
      this.router.navigate(['myshop/series'])
    }
    
  }

  getItems(data){
    const b = []
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(element.series[0].length !== 0){
        b.push(element.series[0])
        this.series.push(element.series[0])
        }
    }
    for (let index = 0; index < b[0].length; index++) {
      const i = b[0][index]; 
      if(i.items[0] !== 0){
        for (let index = 0; index < i.items[0].length; index++) {
          const c = i.items[0][index];
          this.items.push(c)
        }
      }
    }
    this.shopdata.items = this.items
  }

  selected(value){
    this.loader.open
    this.shopdata.selectedItem = value
    this.router.navigate(['myshop/products/'+ value.id]);
  }

  getCart() {
    this.shopdata
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    })
  }
  addToCart(product) {
    let cartItem: CartItem = {
      product: product,
      data: {
        quantity: 1
      }
    };
    this.shopdata
    .addToCart(cartItem)
    .subscribe(cart => {
      this.cart = cart;
      this.snackBar.open('Product added to cart', 'OK', { duration: 4000 });
    })
  }
 
  
}
