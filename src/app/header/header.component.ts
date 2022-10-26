import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faUpRightFromSquare = faUpRightFromSquare
  currentUser:User
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage['userProfile'])
  }
disconnection(){
  return this.usersService.logout().subscribe()
}
}
