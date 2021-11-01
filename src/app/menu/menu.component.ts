import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private userServ:UserService) {
  }

  userName = this.userServ.getLogedUser().userName;

  ngOnInit(): void {
  }

}
