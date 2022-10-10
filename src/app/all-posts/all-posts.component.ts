import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
posts:Post[]
  constructor(
    private postsServices:PostsService
  ) { }

  ngOnInit(): void {
    this.postsServices.getAllPosts().subscribe(console.table)
  }

}
