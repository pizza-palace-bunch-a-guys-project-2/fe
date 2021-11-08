import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Item } from '../menu-item/Iitem';
import { NgIf } from '@angular/common';
//import { User } from './user';

// import { UserService } from './user.service';

export interface MenuItem extends Item {
  itemId?: number;
  itemName: string;
  description: string;
  price: number;
  remove?: boolean;
  qty?: number;
  orderTotal?: number;
  orderTax?: number;
  orderTaxTotal?: number;
  imageURL?: string;
  tipAmount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartItems: any = new BehaviorSubject<MenuItem[]>([]);
cartData: Observable<MenuItem[]> = this.cartItems.asObservable();

tipAmount: number;

totalAmount$: Observable<number>;
totalAmountTax$: Observable<number>;
totalAmountTip$ = new BehaviorSubject<number>(0);
totalAmountCheckout$: Observable<number>;


  constructor(/* private http: HttpClient */) {
    // JSON.parse(localStorage.getItem('cartItems'))
    console.warn('Cart Service')
    const itemList = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.cartItems.next(itemList);

    this.totalAmount$ = this.cartData.pipe(
      //combine w/ async -->mapfilter
      map((items: MenuItem[]) => {
        // call all elements in cart array
        return items.reduce((a, b) => a += b.price * b.qty, 0);
      })
    );

    //combine-latest use for reliable/multiple obsv. calculations try this w/ tip+$tAmount
      //--take in OBSV, BS...pipe through return new $tAC

    this.totalAmountCheckout$ = combineLatest([this.totalAmount$, this.totalAmountTip$]).pipe(
      map(([totalAmount, totalAmountTip]) => totalAmountTip + (1.08) * totalAmount)
    );

    this.totalAmountTax$ = this.totalAmount$.pipe(
      map(totalAmount => (.08) * totalAmount)
    );
  }


  /* RETURN VALUE FROM OBSERVABLE BELOW */
  getValueFromObservable() {
    return new Promise(resolve => {
      this.totalAmountCheckout$.pipe(
        take(1),
      ).subscribe(
        (data: any) => {
          console.log(data);
          resolve(data);
        })
    })
  }
  /* RETURN VALUE FROM OBERSERVABLE ABOVE */

  // source no longer as goes straight to value
  // need to look at items being add init then set index =0->1, return w/ spread
  // keep adding then updateQty w/ sim below

  addItem(item: MenuItem) {
    const items = this.cartItems.value;
    const index = items.findIndex(o => o.itemId === item.itemId);
    if (index >= 0) {
      const newItem = Object.assign({}, items[index], {
        qty: items[index].qty + 1
      });
      const newItems = [
        ...items.slice(0, index),
        newItem,
        ...items.slice(index + 1)
      ];
      this.cartItems.next(newItems);
    }
    else {
      item.qty = 1;
      const newItems = [
        ...items,
        item
      ];
      this.cartItems.next(newItems);
    }


    console.log(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
    this.totalAmountTip$.next(0);
  }

  removeItem(item: MenuItem) {
    this.cartItems.next(this.cartItems.value.filter((i: any) => i.itemId !== item.itemId ))
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
    // localStorage.removeItem('cartItems');
  }

  updateItemQty(item: MenuItem, qty: number) {
    const items = this.cartItems.value;
    const index = items.findIndex(o => o.itemId === item.itemId);
    if (index >= 0) {
      const newItem = Object.assign({}, items[index], {
        qty: qty
      });
      const newItems = [
        ...items.slice(0, index),
        newItem,
        ...items.slice(index + 1)
      ];

      this.cartItems.next(newItems) // updates observable with updated item
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
    }
  }

  clear() {
    this.cartItems.next([]);
    this.totalAmountTip$.next(0);
    // localStorage.setItem('cartItems', '');
    localStorage.removeItem('cartItems');
  }

  addItemToCheckout(item: any) {

  }

  isCartEmpty() {
    return !this.cartItems.value.length
  }


}





