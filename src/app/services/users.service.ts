import { Injectable } from '@angular/core';
// import { HttpClient } from "@angular/common/http";
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(
    // http:HttpClient
    ) { }
  newUser(user:User){
    console.log("le nouvelle utilisateur: "+ JSON.stringify(user)+" va être envoyé à l'api")
  }
}
