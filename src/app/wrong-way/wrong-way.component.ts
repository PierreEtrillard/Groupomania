import { Component, OnInit } from '@angular/core';
import { faSignsPost } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-wrong-way',
  templateUrl: './wrong-way.component.html',
  styleUrls: ['./wrong-way.component.scss']
})
export class WrongWayComponent implements OnInit {
  faSignsPost=faSignsPost
  constructor() { }

  ngOnInit(): void {
  }

}
