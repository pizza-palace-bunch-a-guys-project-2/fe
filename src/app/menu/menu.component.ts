import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuTitle: string;
  menuDescription: string;

  isPizza: boolean;
  isDessert: boolean;
  isDrinks: boolean;

  
  constructor(private userServ:UserService) {
  }

  userName = this.userServ.getLogedUser().userName;

  ngOnInit(): void {
    this.selectedPizzaMenu();
  }

  public selectedPizzaMenu(): void {
    this.menuTitle = "Pizza";
    this.menuDescription = "Our pizzas are made with homemade dough, toasted parmesan cheese, marinara, and various cheeses.";
    this.isPizza = true;
    this.isDessert = false;
    this.isDrinks = false;
  }

  public selectedDessertMenu(): void {
    this.menuTitle = "Desserts";
    this.menuDescription = "All of our deserts are homemade and fit for any King or Queen.";
    this.isPizza = false;
    this.isDessert = true;
    this.isDrinks = false;
  }

  public selectedDrinksMenu(): void {
    this.menuTitle = "Drinks";
    this.menuDescription = "We are proudly partnered with Coke. Pick the 2 Liter of your choice.";
    this.isPizza = false;
    this.isDessert = false;
    this.isDrinks = true;
  }
}
