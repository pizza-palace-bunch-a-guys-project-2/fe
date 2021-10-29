import { Component, Input, OnInit, Output } from '@angular/core';
import { Item, Data, itemList } from '../services/menuitem';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  items: any;

  constructor(private itemServe:CartService) {
    //this.items = itemServe.cartData._value;
    this.items = itemList;
  }



  ngOnInit(): void {
    console.log(this.items);
  }

  addItemToCart(item) {

    this.itemServe.addItem(item);

  }





}
