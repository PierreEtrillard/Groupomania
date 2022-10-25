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
  postUpdated:Post|undefined
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
  isLiked(postId: string) {//test si le post est déja liké
    if (postId !== undefined && this.currentUser.myLikes !== undefined) {
      return this.currentUser.myLikes.includes(postId)
    } else {
      return false
    }
  }
  postUpdater(postId:string){
    this.postUpdated = this.posts.find(({id})=>{id === postId})
    console.log(postId + this.postUpdated);
    
    if(this.postUpdated){
    this.postUpdated.likers.push("one more like")}
  }
  likeAction(postId: string) {

    if (this.isLiked(postId) && this.currentUser.myLikes !== undefined) {// efface le like déja present dans l'objet utilisateur
      this.currentUser.myLikes = this.currentUser.myLikes.filter(
        (idList) => idList !== postId)
    } else { if (this.currentUser.myLikes !== undefined) { // ajoute un like
      this.currentUser.myLikes.push(postId) } }
    // post le choix à) l'api
    this.postsServices.likePost(postId, this.isLiked(postId)).subscribe((res)=>{console.log("reponse de l'api:  "+ res.message);
    this.postUpdater(postId)
  })
  }
  addComment() {
    this.commentArea = true
    // console.table(this.currentUser.myLikes)
    // console.table(this.posts)
  }

}
