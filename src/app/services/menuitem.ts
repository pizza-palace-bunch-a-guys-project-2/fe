export interface Item {
   
type:string,
modifiers:string[],
price:number,
name:string,
image:string,
description:string
    
}

export interface Data {
    username: '',
    items: []
}

export const itemList = [
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