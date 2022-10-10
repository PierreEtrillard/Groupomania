import { Component, OnInit } from '@angular/core';
import { faCalendarDays,faAddressCard,faComment,faEraser } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faCalendarDays=faCalendarDays
  faComment=faComment
  faEraser=faEraser
  faAddressCard=faAddressCard
  constructor() { }

  ngOnInit(): void {
  }

}
