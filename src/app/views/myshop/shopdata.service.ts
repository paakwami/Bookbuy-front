import { Injectable } from '@angular/core';
import { Item } from 'app/shared/models/item.model';
import {throwError as observableThrowError,  Observable} from 'rxjs';

import { of, combineLatest } from 'rxjs';
import { startWith, debounceTime, delay, map, switchMap } from 'rxjs/operators';

export interface CartItem {
  product: Item;
  data: {
    quantity: number,
  };
}

@Injectable({
  providedIn: 'root'
})

export class ShopdataService {

  public cart: CartItem[] = [];
  public cartData = {
    itemCount: 0
  }

  publishers: any[];
  selectedItem: Item;
  public items: any[];
  selectedseries: any[];
  selectedPublisher;
  public going;

  constructor() { 
    this.going={
      'books': true,
      'publisher':false,
      'series':false,
    }
  }

  

  public getCart(): Observable<CartItem[]> {
    return of(this.cart)
  }
  public addToCart(cartItem: CartItem): Observable<CartItem[]> {
    let index = -1;
    this.cart.forEach((item, i) => {
      if(item.product.id === cartItem.product.id) {
        index = i;
      }
    })
    if(index !== -1) {
      this.cart[index].data.quantity += cartItem.data.quantity;
      this.updateCount();
      return of(this.cart)
    } else {
      this.cart.push(cartItem);
      this.updateCount();
      return of(this.cart)
    }
  }
  private updateCount() {
    this.cartData.itemCount = 0;
    this.cart.forEach(item => {
      this.cartData.itemCount += item.data.quantity;
    })
  }
  public removeFromCart(cartItem: CartItem): Observable<CartItem[]> {
    this.cart = this.cart.filter(item => {
      if(item.product.id == cartItem.product.id) {
        return false;
      }
      return true;
    });
    this.updateCount();
    return of(this.cart)
  }
}
