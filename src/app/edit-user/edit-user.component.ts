import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../services/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editGroup: FormGroup;
  modalRef;
  isInvaliSignUp:boolean = false;
  isInvalidUsername:boolean = false;
  isLoading:boolean = false;

  stateRegex:string = "^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$";

  constructor(private modalService: NgbModal, private userServ:UserService, private router:Router) {
    this.user = userServ.getLogedUser();
    this.editGroup = new FormGroup({
      userPassword: new FormControl('',[Validators.required, Validators.minLength(4)]),
      userEmail: new FormControl(this.user.userEmail,[Validators.required, Validators.email]),
      userFirstName: new FormControl(this.user.userFirstName,[Validators.required,  Validators.pattern("^[a-zA-Z]*$")]),
      userLastName: new FormControl(this.user.userLastName,[Validators.required,  Validators.pattern("^[a-zA-Z]*$")]),
      userAddress: new FormControl(this.user.userAddress,[Validators.required]),
      userCity: new FormControl(this.user.userCity,[Validators.required, Validators.pattern("^[a-zA-Z ']*$")]),
      userState: new FormControl(this.user.userState,[Validators.required, Validators.pattern(this.stateRegex), Validators.minLength(2), Validators.maxLength(2)]),
      userZip: new FormControl(this.user.userZip,[Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)])
    });
  }

  get name() {
    return this.user.userName;
  }

  get password(){
    return this.editGroup.get('userPassword')!;
  }

  get email(){
    return this.editGroup.get('userEmail')!;
  }

  get firstName(){
    return this.editGroup.get('userFirstName')!;
  }

  get lastName(){
    return this.editGroup.get('userLastName')!;
  }

  get address(){
    return this.editGroup.get('userAddress')!;
  }

  get city(){
    return this.editGroup.get('userCity')!;
  }

  get state(){
    return this.editGroup.get('userState')!;
  }

  get zip(){
    return this.editGroup.get('userZip')!;
  }

  open(content) {
    this.modalRef = this.modalService.open(content);
  }

  close() {
    this.modalRef.close();
  }

  saveEdit() {
    const editedUser = new User(this.user.userName,
      this.password.value,
      this.email.value,
      this.firstName.value,
      this.lastName.value,
      this.address.value,
      this.city.value,
      this.state.value,
      this.zip.value);

    if(editedUser.haveEmptyStrings()) {
        this.isInvaliSignUp = true;
        return
      } else {
        this.isInvaliSignUp = false;
      }

    this.isLoading = true;

    this.userServ.updateUser(editedUser).subscribe(
      resp => {
        console.log("Response: ", resp);
        this.isInvalidUsername = false;
        this.isLoading = false;
        this.userServ.setUserToDefault();
        this.router.navigate(['/login']);
      },
      er => {
        console.log(er);
        this.isLoading = false;
        this.isInvalidUsername = true;
      }
    )
    this.close();
  }

  ngOnInit(): void {
  }

}
