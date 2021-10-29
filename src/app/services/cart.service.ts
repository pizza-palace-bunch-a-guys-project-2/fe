import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './user';

import { UserService } from './user.service';
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


  constructor(private http: HttpClient, private user: UserService) {
    console.warn('Cart Service')
    const mockData =  [
      {
        id: 1,
        name: 'margherita',
        description: 'tomatoes, mozzarella, and fresh basil',
        price: 13,
        qty: 1
      },

      {
        id: 2,
        name: 'pepperoni',
        description: 'pepperoni, mozzarella, and olives',
        price: 17,
        qty: 1
      },

      {
        id: 3,
        name: 'cheese',
        description: 'mozzarella, gorgonzola, fontina, and parmigiano',
        price: 12,
        qty: 1
      },

      {
        id: 4,
        name: 'veggie',
        description: 'mushrooms, green peppers, tomatoes, black olives, and onions',
        price: 11,
        qty: 1
      }
    ];
    this.cartItems.next(mockData)
  }

  addItem(item: any) {
    this.cartItems.next(this.cartItems.value.concat(item))
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



