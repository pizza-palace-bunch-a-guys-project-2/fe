import { Component, Input, OnInit, Output } from '@angular/core';
import { ItemService } from './item.service';
import { Item } from './menuitem';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  itemList: Item[] = [];

  constructor(private itemServe:ItemService) { }

  ngOnInit(): void {
    this.itemServe.getItems().subscribe(
      response => {
        this.itemList = response;
      }
    );
  }

}
