import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  constructor() {}

  itemList = [
    {
      type: 'pizza',
      modifiers: ['white sauce', 'no cheese'],
      price: 10.0,
      name: 'Cheese Pizza',
      image: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg',
      description: 'White Commie Pizza',
    },
    {
      type: 'drink',
      modifiers: ['small'],
      price: 3.0,
      name: 'Coke 12oz',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.oCXQ_OHvHYDfHWasLkhUbgHaFb%26pid%3DApi&f=1',
      description: 'Yummy Fuzzy in my tummy',
    },
    {
      type: 'pizza',
      modifiers: ['white sauce', 'no cheese'],
      price: 10.0,
      name: 'Cheese Pizza',
      image: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg',
      description: 'White Commie Pizza',
    },
    {
      type: 'drink',
      modifiers: ['small'],
      price: 3.0,
      name: 'Coke 12oz',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.oCXQ_OHvHYDfHWasLkhUbgHaFb%26pid%3DApi&f=1',
      description: 'Yummy Fuzzy in my tummy',
    },
    {
      type: 'pizza',
      modifiers: ['white sauce', 'no cheese'],
      price: 10.0,
      name: 'Cheese Pizza',
      image: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg',
      description: 'White Commie Pizza',
    },
    {
      type: 'drink',
      modifiers: ['small'],
      price: 3.0,
      name: 'Coke 12oz',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.oCXQ_OHvHYDfHWasLkhUbgHaFb%26pid%3DApi&f=1',
      description: 'Yummy Fuzzy in my tummy',
    },
    {
      type: 'pizza',
      modifiers: ['white sauce', 'no cheese'],
      price: 10.0,
      name: 'Cheese Pizza',
      image: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg',
      description: 'White Commie Pizza',
    },
    {
      type: 'drink',
      modifiers: ['small'],
      price: 3.0,
      name: 'Coke 12oz',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.oCXQ_OHvHYDfHWasLkhUbgHaFb%26pid%3DApi&f=1',
      description: 'Yummy Fuzzy in my tummy',
    },
    {
      type: 'pizza',
      modifiers: ['white sauce', 'no cheese'],
      price: 10.0,
      name: 'Cheese Pizza',
      image: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg',
      description: 'White Commie Pizza',
    },
    {
      type: 'drink',
      modifiers: ['small'],
      price: 3.0,
      name: 'Coke 12oz',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.oCXQ_OHvHYDfHWasLkhUbgHaFb%26pid%3DApi&f=1',
      description: 'Yummy Fuzzy in my tummy',
    },
    {
      type: 'pizza',
      modifiers: ['white sauce', 'no cheese'],
      price: 10.0,
      name: 'Cheese Pizza',
      image: 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg',
      description: 'White Commie Pizza',
    },
    {
      type: 'drink',
      modifiers: ['small'],
      price: 3.0,
      name: 'Coke 12oz',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.oCXQ_OHvHYDfHWasLkhUbgHaFb%26pid%3DApi&f=1',
      description: 'Yummy Fuzzy in my tummy',
    },
  ];

  get getData(): any[] {
    return this.itemList;
  }

  set setData(item:any) {
    this.itemList.push(item);
  }

}
