import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Item } from '../menu-item/Iitem';
import { NgIf } from '@angular/common';
//import { User } from './user';

// import { UserService } from './user.service';
// menucomponent etc.


export interface MenuItem extends Item {
  itemId?: number;
  itemName: string;
  description: string;
  price: number;
  remove?: boolean;
  qty?: number; //NP EDIT DEMO ************ try this with cart comp html see if sets to 1 upon add + 2 below
  orderTotal?: number;
  orderTax?: number;
  orderTaxTotal?: number;
  imageURL?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartItems: any = new BehaviorSubject<MenuItem[]>([]);
cartData = this.cartItems.asObservable();

totalAmount$: Observable<number>;
totalAmountTax$: Observable<number>;
totalAmountCheckout$: Observable<number>;


    // add user service injection
  constructor(private http: HttpClient) {
    // JSON.parse(localStorage.getItem('cartItems'))
    console.warn('Cart Service')
    const itemList = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.cartItems.next(itemList);

    this.totalAmount$ = this.cartData.pipe(
      //combine w/ async -->mapfilter
      map((items: MenuItem[]) => {
        // call all elements in cart array
        return items.reduce((a, b) => a += b.price, 0);
        // return items.reduce((a, b) => a += b.price * b.qty, 0);
      })
    );

    this.totalAmountTax$ = this.cartData.pipe(
      map((items: MenuItem[]) => {

        return items.reduce((a, b) => (a += b.price)*(.08), 0);

      })
    );

    this.totalAmountTax$ = this.cartData.pipe(
      map((items: MenuItem[]) => {

        return (.08)*items.reduce((a, b) => (a += b.price), 0);

      })
    );

    this.totalAmountCheckout$ = this.cartData.pipe(
      map((items: MenuItem[]) => {
        // return items.reduce((a, b) => a += (b.price*1.08), 0);
        return (1.08)*items.reduce((a, b) => a += b.price, 0);

      })
    );
  }

  addItem(item: MenuItem) {
    if (this.cartItems.value.findIndex(o => o.itemId === item.itemId) >= 0) {
      alert('already added!');
      return;
    }

    this.cartItems.next(this.cartItems.value.concat(item));
    console.log(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));

    //NP EDIT DEMO ** try this for pushing to checkout---
    // localStorage.setItem('cartItems', JSON.stringify(this.cartData.value));
    // console.log(this.cartItems.value);
  }

  removeItem(item: MenuItem) {
    this.cartItems.next(this.cartData.source.value.filter((i: any) => i.itemId !== item.itemId ))
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
    // localStorage.removeItem('cartItems');
  }

  updateItemQty(item: any, qty: number) {
    const cartData = this.cartData.source.value
    const index: any = cartData.findIndex((i: any) => { // finds index using id's
      return i.id == item.id
    })
    cartData[index].qty = qty; // assigns qty to item to update
    this.cartItems.next(cartData) // updates observable with updated item
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
  }

  clear() {
    this.cartData.next([]);
    localStorage.setItem('cartItems', '');
  }


  addItemToCheckout(item: any) {

  }

  isCartEmpty() {
    return !this.cartItems.value.length
  }


}





