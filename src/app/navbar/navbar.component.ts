import { Component, OnInit } from '@angular/core';
import { faEraser, faStar, faAddressCard, faComment, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { AllPostsComponent } from '../all-posts/all-posts.component';
import { PostsService } from '../services/posts.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faStar = faStar
  faComment = faComment
  faAddressBook = faAddressBook
  faAddressCard = faAddressCard
  faEraser = faEraser
  correctingMod: boolean = false
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    console.log(this.correctingMod)

  }
  correctorSwitch() {
    this.correctingMod ? this.correctingMod = false : this.correctingMod = true
    this.postsService.correctorSwitch()
  }
}