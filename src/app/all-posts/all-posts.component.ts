import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { faEraser, faCommenting, faHeart } from "@fortawesome/free-solid-svg-icons";
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
  posts: Post[]
  users: User[]
  currentUUID: string
  currentUser: any

  faEraser = faEraser
  faCommenting = faCommenting
  faHeart = faHeart
  commentArea: boolean = false
  correctingMod: boolean = false
  constructor(
    private postsServices: PostsService,
    private usersServices: UsersService
  ) { }

  ngOnInit(): void {
    this.postsServices.getAllPosts().subscribe(
      (obs) => { this.posts = obs })
    this.currentUUID = document.cookie.split("userId=")[1]
    this.usersServices.getAllProfiles().subscribe(obs => this.users = obs)
    this.usersServices.getUserProfile().subscribe((obs) => { this.currentUser= obs })
  }

  addComment() {
    this.commentArea = true
    // console.table(this.currentUser.myLikes)
    // console.table(this.posts)
  }

}
