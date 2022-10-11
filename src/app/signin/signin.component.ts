import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {User} from '../models/user.model'
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  public signinForm: FormGroup;
  newUser:User
  constructor(private usersService:UsersService, private formBuilder:FormBuilder) { }
  
  ngOnInit() {
    // le model du formulaire est créé ici:

    this.signinForm =this.formBuilder.group({
      pseudo: ["",[Validators.required,Validators.minLength(2)]],
      email: ["",[Validators.required,Validators.email] ],
      /*pour les regexp de password coté front la lecture de l'article suivant à orienté mon choix de régle: 
      https://stackoverflow.com/questions/48345922/reference-password-validation/*/
      password: ["",[Validators.required,Validators.minLength(9)]],
      userCheck:["", Validators.required]
    })
  }
  sendNewUser(){
    this.newUser = {
        pseudo: this.signinForm.value.pseudo,
        email: this.signinForm.value.email,
        password: this.signinForm.value.password,
      };
    this.usersService.newUser(this.newUser).subscribe()
  }
}