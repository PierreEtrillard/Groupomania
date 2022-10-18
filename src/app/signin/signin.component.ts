import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model'
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;
  newUser: User
  errorMsg: string = ""
  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    // le model du formulaire est créé ici:
    this.signinForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      /*pour les regexp de password coté front la lecture de l'article suivant à orienté mon choix de régle: 
      https://stackoverflow.com/questions/48345922/reference-password-validation/*/
      password: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(30)]],
      userCheck: ["", Validators.required]
    })
  }
  sendNewUser() {
    this.newUser = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password,
    };
    this.usersService.newUser(this.newUser).pipe(
      switchMap(() => this.usersService.login(this.newUser)),
      tap(() => {
        this.router.navigate(['/posts']);
      }),
      catchError(error => {
        this.errorMsg = error.message;
        return EMPTY;
      })
    ).subscribe();
  }
}