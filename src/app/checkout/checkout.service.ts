import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {
private urlBase = "http://localhost:9015/checkout/orderplaced";

  constructor(private http: HttpClient) { }

  public insertOrder( order: any): Observable<Order>{
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };
    return this.http.post<Order>(this.urlBase, order, httpHead);
  }


}
