import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { faEraser, faCommenting, faHeart, faMagnifyingGlassPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { User } from '../models/user.model';
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
  faPen = faPen
  faTrash = faTrash
  catchResponse: any
  message: string
  correctingMod: boolean
  loading: boolean = false
  loadMessage: string
  constructor(
    private postsServices: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postsServices.getAllPosts().subscribe((postArray) => {
      this.posts = postArray;
      if (this.posts.length ===0||this.posts.length ===null) {
        this.message = "Aucun posts publié pour l'instant";
        setTimeout(() => {
          this.message = "";this.router.navigate(['/newpost'])
        }, 3000);
        
      }else{
      localStorage['allPosts'] = JSON.stringify(this.posts)
    }})
    this.currentUser = JSON.parse(localStorage['userProfile'])
    this.correctingMod = false
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
        (lkersIds) => lkersIds !== this.currentUser.id)

    } else {
      if (this.currentUser.myLikes !== undefined && postAuthor !== this.currentUser.name) { // ajoute un like 
        targetedPost?.likers.push(this.currentUser.id)
        this.currentUser.myLikes.push(postId)
      }
    }
    setTimeout(() => { this.message = "" }, 3000)
    //traitement dans le localstorage pour eviter une requète
    localStorage['allPosts'] = JSON.stringify(this.posts)
    localStorage['userProfile'] = JSON.stringify(this.currentUser)
    // mise à jour de la BDD faite par l'API
    this.postsServices.likePost(postId, this.isLiked(postId)).subscribe(console.log)
  }
  showDetails(postId: string) {
    this.router.navigate([`post/${postId}`])
  }
  correctingModSwitch() {
    this.correctingMod ? this.correctingMod = false : this.correctingMod = true
  }

  correctable(postAuthor: string) {
    if (postAuthor === this.currentUser.name && this.correctingMod) {
      return true
    } else {
      return false
    }
  }
  erasable(postAuthor: string) {
    if (
      (postAuthor === this.currentUser.name || this.currentUser.role !== 'normal') && this.correctingMod) {
      return true
    } else {
      return false
    }
  }
  erase(postId: string, postAuthor: string) {
    this.loading = true
    this.postsServices.deleteOne(postId).subscribe({
      next: (response) => {
        this.catchResponse = response;
        this.message = this.catchResponse.message
        setTimeout(() => {
          this.message = "";
          this.loading = false
          this.posts = this.posts.filter((post) => post.id !== postId)
        }, 1500)
        //traitement dans le localstorage pour eviter une requète
        localStorage['allPosts'] = JSON.stringify(this.posts)
      },
      error: (error) => console.error(error),
    })
  }
  correctIt(postId: string) {
    this.router.navigate([`corrector/${postId}`])
  }

}