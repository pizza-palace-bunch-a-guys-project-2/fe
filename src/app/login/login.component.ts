import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../services/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [Validators.required])
  });

  isInvalidLogin:boolean = false;

  constructor(private userServ:UserService) {}

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
        this.isInvalidLogin = false;
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
