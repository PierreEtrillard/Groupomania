import { Component, OnInit } from '@angular/core';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faUpRightFromSquare = faUpRightFromSquare
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    
  }
disconnection(){
  return this.usersService.logout().subscribe()
}
}
