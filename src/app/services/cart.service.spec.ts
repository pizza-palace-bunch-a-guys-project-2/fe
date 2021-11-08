import { TestBed, fakeAsync, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { Item } from '../menu-item/Iitem';


const fakeMenuItem = {
  itemName: 'Pepperoni',
  price: 13
}


describe('CartService', () => {
  let cartService: CartService;
  let mockStream: jasmine.SpyObj<CartService>;
  let fakeMenuItem: any;


    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [CartService]
      });

      cartService = TestBed.inject(CartService);
      // cartService = jasmine.createSpy('CartService');
      });



    it('should be created', () => {
      expect(cartService).toBeTruthy();
    });

    it('#clear should remove all items,', () => {
      expect(cartService.clear()).toEqual();
    });


    // it('#addItem should add item to the cart', () => {
    //   (done: DoneFn) => {
    //     cartService.addItem(fakeMenuItem).subscribe(value => {
    //       expect(value).toBe('pepperoni', 13);
    //       done();
    //     })
    //   }
    // })

    it('#addItem adds an item to the cart', (inject( [CartService], async (cartService) => {
      await cartService.addItem().subscribe(result => expect(result.length).toBeGreaterThanOrEqual(0));
    })));



    it('#isCartEmpty to be empty', () => {
      expect(cartService.isCartEmpty()).toBeFalsy;
    })


    afterEach(() => {

    })

});







