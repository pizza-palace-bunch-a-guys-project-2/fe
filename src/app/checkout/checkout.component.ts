import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Order } from './order';
import { CheckoutService } from './checkout.service';
import { CartService, MenuItem } from '../services/cart.service';
//import { MenuItemService } from '../services/menu-item.service';
declare var AddressFinder: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  hasOrder = false;

  items$: Observable<MenuItem[]>; //NP EDIT DEMO

  totalAmount$: Observable<number>;
  totalAmountTax$: Observable<number>;
  totalAmountCheckout$: Observable<number>;

  paymentGroup = new FormGroup({
    card_number: new FormControl(''),
    cardholder: new FormControl(''),
    cardexpiration: new FormControl(''),
    security_code: new FormControl(''),
    billingzip: new FormControl('')
  });

  addressGroup = new FormGroup({
    street_name: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zipcode: new FormControl('')
  });


  pizzaPic = "https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=20&m=938742222&s=612x612&w=0&h=X5AlEERlt4h86X7U7vlGz3bDaDDGQl4C3MuU99u2ZwQ=";
  userInfo: Object[];
  itemFood: String = "Cheese Pizza, Breadsticks";
  // NP EDIT DEMO *** CHANGED ITEM TO ITEMFOOD

  total: number = 25;
  address: String = "";
  paymentDetails: String = "";
  userId: number = 1;


  constructor(private cServ:CheckoutService, private cartService: CartService) {
    // this.userInfo = cServ.userInfo;
    // this.itemList = cServ.itemList;   private cServ:MenuItemService

    //NP EDIT DEMO BELOW EVERYTHING CONSTRUCTOR
    /*
    const sub = this.cartService.cartItems.subscribe((data: any) => {
      console.warn('Data', data)
      this.items = data
    });
    */

    this.items$ = cartService.cartItems;
    this.totalAmount$ = cartService.totalAmount$;
    this.totalAmountTax$ = cartService.totalAmountTax$;
    this.totalAmountCheckout$ = cartService.totalAmountCheckout$;

    // NP EDIT DEMO ABOVE EVERYTHING CONSTRUCTOR
  }
  ngOnInit(): void {

  }

  // NP EDIT DEMO *** CHANGED ITEM TO ITEMFOOD
  createOrder() {
    let order = new Order(this.itemFood, this.getPaymentDetails(this.paymentGroup), this.getAddress(this.addressGroup), this.total, this.userId)
    console.log(order);

    this.submitOrder(order);
  }

  public submitOrder(order){
    console.log(order);
    let stringOrder = JSON.stringify(order);
    this.cServ.insertOrder(stringOrder).subscribe(
      response => {
        console.log(response);

        this.cartService.clear();
      },
      error =>{
        console.warn("there was an error" + error);
      }
    )
  }

  getPaymentDetails(paymentGroup: FormGroup) {
    let cardNumber = paymentGroup.get('card_number').value;
    let cardHolder = paymentGroup.get('cardholder').value;
    let cardExpiration = paymentGroup.get('cardexpiration').value;
    let securityCode = paymentGroup.get('security_code').value;
    let billingZip = paymentGroup.get('billingzip').value;

    this.paymentDetails = "";

    this.paymentDetails += cardNumber + ', ';
    this.paymentDetails += cardHolder + ', ';
    this.paymentDetails += cardExpiration + ', ';
    this.paymentDetails += securityCode + ', ';
    this.paymentDetails += billingZip;
    console.log(this.paymentDetails);

    return this.paymentDetails;

  }

  getAddress(addressGroup: FormGroup) {
    let streetName = addressGroup.get('street_name').value;
    let city = addressGroup.get('city').value;
    let state = addressGroup.get('state').value;
    let zipcode = addressGroup.get('zipcode').value;

    this.address = "";

    this.address += streetName + ', ';
    this.address += city + ', ';
    this.address += state + ', ';
    this.address += zipcode;

    console.log(this.address);

    return this.address;
  }





}
