import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../services/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpGroup = new FormGroup({
    userName: new FormControl('',[Validators.required]),
    userPassword: new FormControl('',[Validators.required]),
    userEmail: new FormControl('',[Validators.required]),
    userFirstName: new FormControl('',[Validators.required]),
    userLastName: new FormControl('',[Validators.required]),
    userAddress: new FormControl('',[Validators.required]),
    userCity: new FormControl('',[Validators.required]),
    userState: new FormControl('',[Validators.required]),
    userZip: new FormControl('',[Validators.required])
  });

  isInvaliSignUp:boolean = false;

  constructor(private userServ:UserService) { }

  get name(){
    return this.signUpGroup.get('userName')!;
  }

  get password(){
    return this.signUpGroup.get('userPassword')!;
  }

  get email(){
    return this.signUpGroup.get('userEmail')!;
  }

  get firstName(){
    return this.signUpGroup.get('userFirstName')!;
  }

  get lastName(){
    return this.signUpGroup.get('userLastName')!;
  }

  get address(){
    return this.signUpGroup.get('userAddress')!;
  }

  get city(){
    return this.signUpGroup.get('userCity')!;
  }

  get state(){
    return this.signUpGroup.get('userState')!;
  }

  get zip(){
    return this.signUpGroup.get('userZip')!;
  }


  signUpUser() {

    const user = new User(this.name.value,
      this.password.value,
      this.email.value,
      this.firstName.value,
      this.lastName.value,
      this.address.value,
      this.city.value,
      this.state.value,
      this.zip.value);

    this.userServ.signUpUser(user).subscribe(
      resp => {
        console.log("Response: ", resp);
        this.isInvaliSignUp = false;
      },
      er => {
        console.log(er);
        this.isInvaliSignUp = true;
      }
    );
  }

  ngOnInit(): void {
  }

}
