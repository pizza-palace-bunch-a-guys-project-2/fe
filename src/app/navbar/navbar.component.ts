import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userServ:UserService, private location: LocationStrategy, private router: Router) { }

  ngOnInit(): void {
  }

  preventBackButton() {
    this.userServ.logout();
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, "", window.location.href);
    };
  }

  currentRoute(string){
    return this.router.url.includes('/' + string);
  }

  get isLoggedIn() {
    return this.userServ.isLoggedIn();
  }

}
