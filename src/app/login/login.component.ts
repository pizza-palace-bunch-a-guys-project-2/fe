import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../services/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroup = new FormGroup({
    userName: new FormControl(''),
    userPassword: new FormControl('')
  });

  constructor(private userServ:UserService) { }

  loginUser(loginGroup: FormGroup) {
    const userName = loginGroup.get('userName')!.value;
    const userPassword = loginGroup.get('userPassword')!.value;
    if(userName) {
      console.log('Form input field username has value: ', userName);
    }

    if(userPassword) {
      console.log('Form input field password has value: ', userPassword);
    }

    const user = new User(userName, userPassword);

    this.userServ.retrieveUser(user).subscribe(
      resp => {
        console.log("Response: ", resp);
      }
    );
  }

  ngOnInit(): void {
  }

}
