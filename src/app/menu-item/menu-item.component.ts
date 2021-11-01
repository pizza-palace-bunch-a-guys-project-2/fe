import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ItemService } from './item.service';
import { Item } from './menuitem';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit, DoCheck {

  itemList: Item[] = [];
  filteredList: Item[] = [];
  filter: string;

  @Input() isPizza: boolean;
  @Input() isDessert: boolean;
  @Input() isDrinks: boolean;

  constructor(private itemServe:ItemService, private cartService: CartService) { }

  ngOnInit(): void {
    this.itemServe.getItems().subscribe(
      response => {
        this.itemList = response;
      }
    );
  }

  ngDoCheck(): void {
    this.isPizza && this.changeFilter("pizza");
    this.isDessert && this.changeFilter("dessert");
    this.isDrinks && this.changeFilter("drink");
  }

  private changeFilter(newFilter: string): void {
    this.filter = newFilter;
    this.filteredList = this.itemList.filter((item: Item) => item.type === this.filter);
  }

  addItemToCart(item: any) {
    this.cartService.addItem(item);
  }
}
