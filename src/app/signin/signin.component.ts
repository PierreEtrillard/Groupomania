import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from '../models/user.model'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  invalidMail: boolean = true;
  invalidPassword: boolean = true;
  invalidPseudo: boolean = true;
  pseudoMessage:string="";
  passwordMessage:string="";
  mailMessage:string="";
  user: User = new User;

  constructor() { }
  
  ngOnInit(): void {
  }
  sendForm(registerForm:NgForm){
  console.log(registerForm.form)
  console.log(JSON.stringify(registerForm.value))
}
  
}
// import { Component, OnInit } from '@angular/core';
// import {FormsModule, NgForm} from '@angular/forms';
// import {User} from '../models/user.model'
// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.scss']
// })
// export class SigninComponent implements OnInit {
//   invalidMail: boolean = true;
//   invalidPassword: boolean = true;
//   invalidPseudo: boolean = true;
//   pseudoMessage:string="";
//   passwordMessage:string="";
//   mailMessage:string="";
//   user: User = new User;

//   constructor() { }
  
//   ngOnInit(): void {
//   }
//   sendForm(registerForm:NgForm){
//   console.log(registerForm.form)
//   console.log(JSON.stringify(registerForm.value))
// }
  
// }

