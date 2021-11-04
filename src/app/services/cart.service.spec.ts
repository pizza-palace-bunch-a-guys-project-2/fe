import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';


describe('PokeService', () => {
  let service: CartService;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });


    service = TestBed.inject(CartService);

  });

  afterEach(() => {

  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


//   it('should have addItem()', () => {
//     service.addItem(item)
// });



})
