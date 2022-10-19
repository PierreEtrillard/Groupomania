import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  logData: any
  errorMsg: string
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    // this.userService.login(this.logData).subscribe(()=>this.router.navigate(['']))
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      //prévoir une auth avec mail => email: ["",[Validators.required,Validators.email] ],
      password: ["", [Validators.required, Validators.minLength(9)]]
    })
  }
  async onLogin() {
    this.logData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.userService.login(this.logData).subscribe(
      (err)=>{this.errorMsg=err.message})
  }
}
