import { Component, Input, OnInit, Output } from '@angular/core';
//import { Item, Data } from './Iitem';
import { MenuItemService } from '../menu-item.service';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  items: any;
  constructor(private itemServe:MenuItemService) {
    this.items = itemServe.getData;
  }



  ngOnInit(): void {

  }







}
