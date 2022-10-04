import { Component, OnInit } from '@angular/core';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faUpRightFromSquare = faUpRightFromSquare
  constructor() { }

  ngOnInit(): void {
    
  }

}
