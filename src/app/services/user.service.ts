import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/project1/";

  constructor(private http: HttpClient) { }

  retrieveUser(user: User):Observable<User> {
    return this.http.post<User>(this.url + "login.user", user);
  }
}
