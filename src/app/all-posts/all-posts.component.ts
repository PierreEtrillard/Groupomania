import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { faEraser, faCommenting } from "@fortawesome/free-solid-svg-icons";
import { User } from '../models/user.model';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
posts:Post[]
user:User={name:"pseudo réccupéré par auth",
email:"mail réccupéré par auth" ,
password:"" }
faEraser=faEraser
faCommenting=faCommenting
commentArea:boolean=false
correctingMod:boolean=false
  constructor(
    private postsServices:PostsService
  ) { }

  ngOnInit(): void {
   this.postsServices.getAllPosts().subscribe((res)=>{this.posts=res})
  }
 addComment(){this.commentArea=true}
}
