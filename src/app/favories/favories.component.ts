import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { faMagnifyingGlassPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';

@Component({
  selector: 'app-favories',
  templateUrl: './favories.component.html',
  styleUrls: ['./favories.component.scss']
})
export class FavoriesComponent implements OnInit {
  currentUser: User
  allpost: Post[]
  myFavories: Post[] = []
  faMagnifyingGlassPlus = faMagnifyingGlassPlus
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage['userProfile'])
    this.allpost = JSON.parse(localStorage['allPosts'])

    this.currentUser.myLikes?.forEach(likes => {
      const postLiked = this.allpost.find(post => post.id === likes)
      if (postLiked) { this.myFavories.push(postLiked) }
      else {
        const supprimedPost: Post = {
          title: "Post supprimé",
          textContent: "Post supprimé",
          id: "deleted",
          author: "deleted",
          likers: ["deleted"]
        }
        this.myFavories.push(supprimedPost)
        console.table(this.myFavories)
      }

    })

  }
  goToDetails(postId:string){
    this.router.navigate([`post/${postId}`])
  }
}
