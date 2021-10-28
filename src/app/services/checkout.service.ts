import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Data, Item } from './menuitem'
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  itemList = [
    {
      type: 'pizza',
      modifiers: ['extra cheese', 'add olives'],
      price: 10,
      name: 'Cheese Pizza',
      image: 'url.com',
      description: 'Basic Pizza'
    },
    {
      type: 'soda',
      modifiers: ['none'],
      price: 3,
      name: 'Pepsi',
      image: 'url.com',
      description: 'Nice Soda'
    }
  ];

  userInfo = [
    {
      username: 'TestUser',
      contactinfo: 'test@test.com'
    }
  ]















  constructor() { }
}
