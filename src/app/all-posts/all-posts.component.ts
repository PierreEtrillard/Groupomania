import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { faEraser, faCommenting, faHeart, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
  posts: Post[]
  postUpdated: Post | undefined
  users: User[]
  currentUser: User
  faCommenting = faCommenting
  faEraser = faEraser
  faHeart = faHeart
  faMagnifyingGlassPlus = faMagnifyingGlassPlus
  message: string
  constructor(
    private postsServices: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postsServices.getAllPosts().subscribe((postArray) => {
      this.posts = postArray;
      localStorage['allPosts'] = JSON.stringify(this.posts)
    })
    this.currentUser = JSON.parse(localStorage['userProfile'])
  }

  isNewPost(creationDate: number | undefined): boolean {
    if (creationDate != undefined) {
      return (this.currentUser.lastConnectAt <= creationDate)
    }
    else { return false }
  }

  isLiked(postId: string) {//test si le post est déja liké
    if (postId !== undefined && this.currentUser.myLikes !== undefined) {
      return this.currentUser.myLikes.includes(postId)
    } else {
      return false
    }
  }
  likeAction(postId: string, postAuthor: string) {
    const targetedPost = this.posts.find(post => post.id === postId)
    if (this.currentUser.myLikes !== undefined && postAuthor === this.currentUser.name) {
      this.message = "vous ne pouvez pas liker vos propres posts"
    }
    if (this.isLiked(postId) && this.currentUser.myLikes && targetedPost) {// efface le like déja present dans l'objet utilisateur
      this.currentUser.myLikes = this.currentUser.myLikes.filter(
        (postsIds) => postsIds !== postId)
      targetedPost.likers = targetedPost.likers.filter(
        (lkersIds) => lkersIds !== this.currentUser.name)

    } else {
      if (this.currentUser.myLikes !== undefined && postAuthor !== this.currentUser.name) { // ajoute un like 
        targetedPost?.likers.push(this.currentUser.name)
        this.currentUser.myLikes.push(postId)
      }
    }
    setTimeout(()=>{this.message=""},3000)
    //traitement dans le localstorage pour eviter une requète
    localStorage['allPosts'] = JSON.stringify(this.posts)
    localStorage['userProfile'] = JSON.stringify(this.currentUser)
    // mise à jour de la BDD faite par l'API
    this.postsServices.likePost(postId, this.isLiked(postId)).subscribe(console.log)
  }
  showDetails(postId: string, postAuthor: string) {
    if (postAuthor === this.currentUser.name) {
      this.router.navigate([`corrector/${postId}`])
    } else {
      this.router.navigate([`post/${postId}`])
    }
  }
}