import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  logData: any
  catchResponse: any
  errorMsg:string=''
  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    // this.userService.login(this.logData).subscribe(()=>this.router.navigate(['']))
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      //prévoir une auth avec mail => email: ["",[Validators.required,Validators.email] ],
      password: ["", [Validators.required, Validators.minLength(9)]]
    })
  }
  onLogin() {
    this.logData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.usersService.login(this.logData)
    .subscribe({
      next: (response) => {
        console.log(response)
        this.catchResponse = response
        localStorage['userProfile']=JSON.stringify(this.catchResponse.userProfile)
        this.router.navigate([''])
      },
      error: (error) => {
        const errorStringified =JSON.stringify(error.error)
        this.errorMsg = errorStringified.split('"')[3]
      },
    })
  }
}