import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup
logData:any
  constructor(private formBuilder:FormBuilder, private userService:UsersService) { }

  ngOnInit(): void {
    this.loginForm =this.formBuilder.group({
      pseudo: ["",[Validators.required,Validators.minLength(2)]],
      //prévoir une auth avec mail => email: ["",[Validators.required,Validators.email] ],
      password: ["",[Validators.required,Validators.minLength(9)]]
    })
  }
login(){
  this.logData={
    pseudo:this.loginForm.value.pseudo,
    password:this.loginForm.value.password
  }
this.userService.login(this.logData).subscribe()
}
}
