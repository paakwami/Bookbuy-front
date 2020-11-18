import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { Item } from 'app/shared/models/item.model';
import { Subscription } from 'rxjs';
import { CartItem, ShopdataService } from '../shopdata.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  animations: [egretAnimations]
})
export class ProductDetailsComponent implements OnInit {

  public itemID;
  public Item: Item;
  public quantity: number = 1;
  public cart: CartItem[];
  public cartData: any;
  private productSub: Subscription;

  constructor(
    private shopdata: ShopdataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.Item = this.shopdata.selectedItem;
    this.getCart();
    this.cartData = this.shopdata.cartData;
  }

 

  // initGallery(item: Item) {
  //   if(!product.gallery) {
  //     return;
  //   }
  //   this.photoGallery = product.gallery.map(i => {
  //     return {
  //       url: i,
  //       state: '0'
  //     }
  //   });
  //   if (this.photoGallery[0])  {
  //     this.photoGallery[0].state = '1';
  //   }
  // }

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

}
