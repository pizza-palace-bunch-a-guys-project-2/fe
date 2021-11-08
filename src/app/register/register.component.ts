import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  stateRegex:string = "^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$";

  signUpGroup = new FormGroup({
    userName: new FormControl('',[Validators.required, Validators.minLength(4)]),
    userPassword: new FormControl('',[Validators.required, Validators.minLength(4)]),
    userEmail: new FormControl('',[Validators.required, Validators.email]),
    userFirstName: new FormControl('',[Validators.required,  Validators.pattern("^[a-zA-Z]*$")]),
    userLastName: new FormControl('',[Validators.required,  Validators.pattern("^[a-zA-Z]*$")]),
    userAddress: new FormControl('',[Validators.required]),
    userCity: new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z ']*$")]),
    userState: new FormControl('',[Validators.required, Validators.pattern(this.stateRegex), Validators.minLength(2), Validators.maxLength(2)]),
    userZip: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)])
  });

  isInvaliSignUp:boolean = false;
  isInvalidUsername:boolean = false;
  isLoading:boolean = false;

  constructor(private userServ:UserService, private router:Router) { }

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

      if(user.haveEmptyStrings()) {
        this.isInvaliSignUp = true;
        return
      } else {
        this.isInvaliSignUp = false;
      }

    this.isLoading = true;

    this.userServ.signUpUser(user).subscribe(
      resp => {
        this.isInvalidUsername = false;
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      er => {
        console.log(er);
        this.isLoading = false;
        this.isInvalidUsername = true;
      }
    );
  }

  ngOnInit(): void {
  }

}
