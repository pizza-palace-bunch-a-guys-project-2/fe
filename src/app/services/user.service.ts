import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:9015/users";

  private httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  private logedUser:User;
  private loginUserStatus:boolean;

  constructor(private http: HttpClient) { }

  loginUser(user: User):Observable<User> {
    return this.http.post<User>(this.url +"/login", user, this.httpHead);
  }

  signUpUser(user: User):Observable<User> {
    return this.http.post<User>(this.url, user, this.httpHead);
  }

  setLogedUser(user:User) {
    this.logedUser = user;
    this.loginUserStatus = true;
  }

  getLogedUser():User {
    return this.logedUser;
  }

  isLoggedIn():boolean {
    return this.loginUserStatus;
  }

  logout() {
    this.loginUserStatus = false;
  }
  
}
