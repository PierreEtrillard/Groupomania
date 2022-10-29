import { Component, OnInit } from '@angular/core';
import { faStar, faAddressCard, faComment, faEraser } from "@fortawesome/free-solid-svg-icons";
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
  faEraser = faEraser
  faAddressCard = faAddressCard
  correctingMod: boolean = false
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    localStorage['correctingMod'] = this.correctingMod
  }
  setPost() {
    this.correctingMod ? this.correctingMod = false : this.correctingMod = true
    // if (this.correctingMod){

    // }
    localStorage['correctingMod'] = this.correctingMod
  }
}
