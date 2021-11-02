import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './menuitem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private urlBase = "http://localhost:9015/items";

  constructor(private http: HttpClient) { }

  public getItems(): Observable<Item[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : '*'
      })
    };
    return this.http.get<Item[]>(this.urlBase, httpHead);
  }

}
