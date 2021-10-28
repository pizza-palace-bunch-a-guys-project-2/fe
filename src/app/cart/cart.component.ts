import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { CartService } from '../services/cart.service';
import { MenuItemService } from '../services/menu-item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  closeResult: string = '';

  items: any;





  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private cartService: MenuItemService) { }


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
    console.log(item);
    this.items.splice(item, 1); // need to rework this with the adding same item while in cart functionality...spread op
    console.log('item was removed');
  }
}

