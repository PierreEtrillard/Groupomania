import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
users:User[]
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
   this.usersService.getAllProfiles().subscribe(res=>{this.users = res})}

}
