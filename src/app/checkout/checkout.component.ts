import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//import { MenuItemService } from '../services/menu-item.service';
declare var AddressFinder: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
 
  // ngOnInit() {
  //   let script = document.createElement("script");
  //   script.src="https://api.addressfinder.io/assests/v3/widget.js";
  //   script.async = true;
  //   script.onload = this.initAf;
  //   document.body.appendChild(script);
  // }
  
  // initAf() {
  //   let widget = new AddressFinder.Widget(
  //     document.getElementById("addrs_1"),
  //     "ADDRESSFINDER_DEMO_KEY",
  //     "AU",
  //     {}
  //   );
  //   widget.on("result:select", function(fullAddress, metaData) {
  //     (<HTMLInputElement>document.getElementById("cnumber")).value = metaData.address_line_1;
  //     (<HTMLInputElement>document.getElementById("cname")).value = metaData.address_line_2;
  //     (<HTMLInputElement>document.getElementById("cexpdate")).value = metaData.locality_name;
  //     (<HTMLInputElement>document.getElementById("csecuritycode")).value = metaData.state_territory;
  //     (<HTMLInputElement>document.getElementById("czipcode")).value = metaData.postcode;
  //   });
  // }
  hasOrder = false;
  //userInfo:string; this will be the user object, and include fields like
  //username, name, email, phone number, address. This should be 
  paymentGroup = new FormGroup({
    card_number: new FormControl(''),
    cardholder: new FormControl(''),
    cardexpiration: new FormControl(''),
    security_code: new FormControl(''),
    billingzip: new FormControl('')
    })
  //There will be a service class passed into this constructor
  //which contains the contents of the cart
  pizzaPic = "https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=20&m=938742222&s=612x612&w=0&h=X5AlEERlt4h86X7U7vlGz3bDaDDGQl4C3MuU99u2ZwQ=";
  userInfo:Object[];
  itemList:Object[];
  
  constructor() {
      // this.userInfo = cServ.userInfo;
      // this.itemList = cServ.itemList;   private cServ:MenuItemService
   }



  getPaymentDetails(paymentGroup:FormGroup){
    if(paymentGroup.get('card_number').value){
      console.log('form input field card_number has value ' + paymentGroup.get('card_number').value)
    }
      if(paymentGroup.get('cardholder').value){
        console.log('form input field cardholder has value ' + paymentGroup.get('cardholder').value)
    }
    if(paymentGroup.get('cardexpiration').value){
      console.log('form input field cardexpiration has value ' + paymentGroup.get('cardexpiration').value)
    }
    if(paymentGroup.get('security_code').value){
      console.log('form input field security_code has value ' + paymentGroup.get('security_code').value)
    }
    if(paymentGroup.get('billingzip').value){
      console.log('form input field billingzip has value ' + paymentGroup.get('billingzip').value)
    }
}
}