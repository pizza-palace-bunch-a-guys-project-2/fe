import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
//import { User } from './user';

// import { UserService } from './user.service';
// menucomponent etc.


export interface MenuItem {
  id?: number;
  name: string;
  description?: string;
  price: number;
  remove?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartItems: any = new BehaviorSubject(null);
cartData = this.cartItems.asObservable();

    // add user service injection
  constructor(private http: HttpClient) {
    console.warn('Cart Service')
    const itemList = [];
    this.cartItems.next(itemList);
  }

  addItem(item: any) {
    this.cartItems.next(this.cartItems.value.concat(item));
    console.log(this.cartItems);
  }

  removeItem(item: any) {
    this.cartItems.next(this.cartData.source.value.filter((i: any) => i.id !== item.id ))
  }

  updateItemQty(item: any, qty: number) {
    const cartData = this.cartData.source.value
    const index: any = cartData.findIndex((i: any) => { // finds index using id's
      return i.id == item.id
    })
    cartData[index].qty = qty; // assigns qty to item to update
    this.cartItems.next(cartData) // updates observable with updated item
  }


  addItemToCheckout(item: any) {

  }


}




