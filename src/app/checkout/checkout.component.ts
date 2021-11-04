import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from './order';
import { CheckoutService } from './checkout.service';
import { CartService, MenuItem } from '../services/cart.service';
import { createDirectiveTypeParams } from '@angular/compiler/src/render3/view/compiler';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  hasOrder = false;

  items$: Observable<MenuItem[]>; //NP EDIT DEMO
  stateRegex:string = "^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$";


  totalAmount$: Observable<number>;
  totalAmountTax$: Observable<number>;
  totalAmountCheckout$: Observable<number>;

  paymentGroup = new FormGroup({
    card_number: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]),
    cardholder: new FormControl('',[Validators.required, Validators.minLength(6)]),
    cardexpiration: new FormControl('', [Validators.required]),
    security_code: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3), Validators.maxLength(3)]),
    billingzip: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)])
  });

  addressGroup = new FormGroup({
    street_name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]),
    state: new FormControl('', [Validators.required, Validators.pattern(this.stateRegex), Validators.minLength(2), Validators.maxLength(2)]),
    zipcode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)])
  });

  tipGroup = new FormGroup({
    tip_amount: new FormControl('')
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

  getItems():string {
    let itemArray:any;
   
   itemArray = JSON.parse(localStorage.getItem('cartItems'));
   console.log(itemArray);
   let itemString:string = "";
   for(let i = 0; i<itemArray.length; i++){
     itemString += itemArray[i].itemName + ", "
   }
   return itemString;
   console.log(itemString);
  };

  // NP EDIT DEMO *** CHANGED ITEM TO ITEMFOOD
  // createOrder() {
  //   let order = new Order(this.itemFood, this.getPaymentDetails(this.paymentGroup), this.getAddress(this.addressGroup), this.total, this.userId)
  //   //this.itemSplit= this.splitItems(this.items);
  // }

  // splitItems(items):string[]{
  //   this.itemSplit = items.split(", ", items.length)
  //   console.log(this.itemSplit);
  //   return this.itemSplit;
  // }



  createOrder() {
    let order = new Order(this.getItems(),
      this.getPaymentDetails(), 
      this.getAddress(), 
      this.total, 
      this.userId)
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



  getPaymentDetails() {
    this.paymentDetails = "";
    this.paymentDetails += this.card_number.value + ', ';
    this.paymentDetails += this.cardholder.value + ', ';
    this.paymentDetails += this.cardexpiration.value + ', ';
    this.paymentDetails += this.security_code.value + ', ';
    this.paymentDetails += this.billingzip.value;
    
    console.log(this.paymentDetails);

    return this.paymentDetails;

  }

  getAddress() {
    this.address = "";

    this.address += this.street_name.value + ', ';
    this.address += this.city.value + ', ';
    this.address += this.state.value + ', ';
    this.address += this.zipcode.value;

    console.log(this.address);

    return this.address;
  }

  // calculateTotal(tipGroup:FormGroup) {
  //   let tip:number = tipGroup.get('tip_amount').value;
  //   console.log(tip);
  //    this.finalTotal = this.total + tip;
  //    console.log(this.finalTotal);
  //   return this.finalTotal;
  // }

  get card_number() {
    return this.paymentGroup.get('card_number')!
  };

  get cardholder() {
    return this.paymentGroup.get('cardholder')!
  };

  get cardexpiration() {
    return this.paymentGroup.get('cardexpiration')!
  };

  get security_code() {
    return this.paymentGroup.get('security_code')!
  };

  get billingzip(){
    return this.paymentGroup.get('billingzip')!
  };

  get street_name() {
    return this.addressGroup.get('street_name')!
  };

  get city(){
    return this.addressGroup.get('city')!
  };

  get state(){
    return this.addressGroup.get('city')!
  };

  get zipcode(){
    return this.addressGroup.get('zipcode')!
  };


}





  // paymentGroup = new FormGroup({
  //   card_number: new FormControl('',[Validators.required, Validators.minLength(8)]),
  //   cardholder: new FormControl('',[Validators.required, Validators.minLength(6)] ),
  //   cardexpiration: new FormControl('', [Validators.required]),
  //   security_code: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3), Validators.maxLength(3)]),
  //   billingzip: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)])
  // });

  // addressGroup = new FormGroup({
  //   street_name: new FormControl('', [Validators.required]),
  //   city: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]),
  //   state: new FormControl('', [Validators.required, Validators.pattern(this.stateRegex), Validators.minLength(2), Validators.maxLength(2)]),
  //   zipcode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)])
  // });