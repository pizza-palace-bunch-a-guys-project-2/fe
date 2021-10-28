import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

import { UserService } from './user.service';
// menucomponent etc.


export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  remove?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  @Input() item: any;
  @Output() itemAdded = new EventEmitter();



  constructor(private http: HttpClient, private user: UserService) {

  }

  addItemToCheckout(item: any) {
    this.itemAdded.emit(item);
  }




}



