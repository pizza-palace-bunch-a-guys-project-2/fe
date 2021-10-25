import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../services/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpGroup = new FormGroup({
    userName: new FormControl(''),
    userPassword: new FormControl(''),
    userEmail: new FormControl(''),
    userFirstName: new FormControl(''),
    userLastName: new FormControl('')
  });

  constructor(private userServ:UserService) { }

  signUpUser(signUpGroup: FormGroup) {
    const userName:string = signUpGroup.get('userName')!.value;
    const userPassword:string = signUpGroup.get('userPassword')!.value;
    const userEmail:string = signUpGroup.get('userEmail')!.value;
    const userFirstName:string = signUpGroup.get('userFirstName')!.value;
    const userLastName:string = signUpGroup.get('userLastName')!.value;
    const userRoleId:number = 1;

    const user = new User(userName, userPassword, userEmail, userFirstName, userLastName, userRoleId);

    this.userServ.signUpUser(user).subscribe(
      resp => {
        console.log("Response: ", resp);
      }
    );
  }

  ngOnInit(): void {
  }

}
