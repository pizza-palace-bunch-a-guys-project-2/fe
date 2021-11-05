import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CartService, MenuItem } from '../services/cart.service';
import { UserService } from '../services/user.service';
import { CheckoutService } from './checkout.service';
import { Order } from './order';


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
  // totalAmount$:number;
  // totalAmountTax$:number;
  // totalAmountCheckout$:number;


  totalAmountTip$: Observable<number>;

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

  totalOrder: number;
  address: String = "";
  paymentDetails: String = "";
  userId: number;
  itemString: string = "";

  constructor(private cServ:CheckoutService, private cartService: CartService, private uServ:UserService) {
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
    this.totalAmountTip$ = cartService.totalAmountTip$;
    this.totalAmountCheckout$ = cartService.totalAmountCheckout$;
    
    // NP EDIT DEMO ABOVE EVERYTHING CONSTRUCTOR
    console.log(this.totalAmountTip$)
    console.log(this.totalAmountCheckout$);


  }

  updateTipAmount(tip) {
    if (tip.target.value !== '') {
      this.cartService.totalAmountTip$.next(parseFloat(tip.target?.value)) // input updates this observable
      this.totalAmountCheckout$ = this.cartService.totalAmountCheckout$; // updates local totalAmount property
    } else {
      this.cartService.totalAmountTip$.next(0) // input updates this observable
      this.totalAmountCheckout$ = this.cartService.totalAmountCheckout$;
    }

  }
  ngOnInit(): void {

  }

  //gets value from observable

  getValueFromObservable() {
    return new Promise(resolve => {
      this.totalAmountCheckout$.pipe(
        take(1),
      ).subscribe(
        (data: any) => {
          console.log(data);
          this.totalOrder = data;
          resolve(data);
        })
    })

    // this.totalAmountTip$ = null;
  }

  getItems():string {
    let itemArray:any;
   
   itemArray = JSON.parse(localStorage.getItem('cartItems'));
   
   
   for(let i = 0; i<itemArray.length; i++){
     this.itemString += itemArray[i].itemName + ", "
   }
   console.log(this.itemString);
   return this.itemString;
   
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
   
    this.getValueFromObservable()
    this.userId = this.uServ.getLogedUser().userId
    let order = new Order(this.getItems(),
      this.getPaymentDetails(), 
      this.getAddress(), 
      this.totalOrder,
      this.userId
      )
    console.log(order);

    this.submitOrder(order);
    this.clearForms();
    alert("Order Submitted Successfully");
  }

  public submitOrder(order){
    this.cartService.clear();

    // this.totalAmountTip$.subscribe(this.ngOnInit);
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

  clearForms(){
    this.paymentGroup.reset()
    this.addressGroup.reset()
    
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

 
  // set card_number(string:""){
  //   this.paymentGroup.patchValue({card_number: ""})
  // }


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