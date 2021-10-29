import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  closeResult: string = '';
  items: any;


  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, public cartService: CartService) {
    const sub = this.cartService.cartItems.subscribe((data: any) => {
      console.warn('Data', data)
      this.items = data
    });

    // sub.unsubscribe();

  }

  //menu comp - temp method, move to menu
  addItemToCart() {
    const mockItem = {
      id: 5,
      name: 'BBQ chicken',
      description: 'mushrooms, green peppers, tomatoes, black olives, and onions',
      price: 15,
      qty: 1
    }
    console.warn("Item Added:", mockItem)
    this.cartService.addItem(mockItem)
  }

  updateItemQty(item: any, qty: any) {
    this.cartService.updateItemQty(item, parseInt(qty.target.value))
  }

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

  ngOnInit(): void {

  }
//*********** */
  addToCheckout() {
    // proccess cart data here and move to checkout
    // this.items = this.cartService.cleartCart();
    // this.cartForm.reset();
  }

  removeCartItem(item: any) {
    console.log('item was removed');
    this.cartService.removeItem(item)
  }
}

