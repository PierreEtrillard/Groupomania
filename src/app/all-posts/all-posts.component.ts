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
  currentUser: User

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
    this.currentUser = JSON.parse(localStorage['userProfile'])
  }
  isLiked(postId: string) {
    if (postId !== undefined) {
      return this.currentUser.myLikes.includes(postId)
    } else {
      return false
    }
  }
  likeAction(postId: string) {

    if (this.isLiked(postId)) {
      this.currentUser.myLikes=this.currentUser.myLikes.filter(
        (idList) => idList !== postId)
    } else { this.currentUser.myLikes.push(postId) }
    //this.userservice updater le [mylikes]
    console.table(this.currentUser.myLikes)
    this.postsServices.likePost(postId, this.isLiked(postId)).subscribe()



  }
  addComment() {
    this.commentArea = true
    // console.table(this.currentUser.myLikes)
    // console.table(this.posts)
  }

}
