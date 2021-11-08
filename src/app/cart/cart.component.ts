import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CartService, MenuItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  closeResult: string = '';
  items$: Observable<MenuItem[]>;


  constructor(private modalService: NgbModal, /* private formBuilder: FormBuilder */ public cartService: CartService) {
    /*
    const sub = this.cartService.cartItems.subscribe((data: any) => {
      console.warn('Data', data)
      this.items = data
    });
    */

    this.items$ = cartService.cartItems;

    // sub.unsubscribe();

  }

  updateItemQty(item: any, qty: any) {
    this.cartService.updateItemQty(item, parseInt(qty.target.value))
  }


  //MODAL BELOW________________________________
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  //MODAL ABOVE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  ngOnInit(): void {
    console.log(this.cartService.cartItems);
  }
//*********** */
  addToCheckout(item: any) {
    // proccess cart data here and move to checkout
    // this.items = this.cartService.cleartCart();
    // this.items.reset();
    this.cartService.addItem(item)

  }

  removeCartItem(item: any) {
    console.log('item was removed');
    this.cartService.removeItem(item)
  }

  addItemToCheckout(item: any) {
    this.cartService.addItem(item);
  }


}
