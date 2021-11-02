import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [Validators.required])
  });

  isInvalidLogin:boolean = false;

  constructor(private userServ:UserService, private router:Router) {}


  get name() {
    return this.loginGroup.get('userName')!;
  }

  get password() {
    return this.loginGroup.get('userPassword')!;
  }


  loginUser( ) {
    if( this.name.value) {
      console.log('Form input field username has value: ',  this.name.value);
    }

    if(this.password.value) {
      console.log('Form input field password has value: ', this.password.value);
    }

    const user = new User(this.name.value, this.password.value);

    this.userServ.loginUser(user).subscribe(
      resp => {
        console.log("Response: ", resp);
        const logUser = new User(resp["userName"],
          resp["userPassword"],
          resp["userEmail"],
          resp["userFirstName"],
          resp["userLastName"],
          resp["userAddress"],
          resp["userCity"],
          resp["userState"],
          resp["userZip"],
          resp["userId"]);
        this.userServ.setLogedUser(logUser);
        this.isInvalidLogin = false;
        this.router.navigate(['/menu']);
      },
      er => {
        console.log(er);
        this.isInvalidLogin = true;
      }
    );
  }

  ngOnInit(): void {
  }

}
