import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post
  constructor(private postsService: PostsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id']
    const allPosts = JSON.parse(localStorage['allPosts'])
    this.post = allPosts.find((post: { id: any; }) => post.id === postId)

  }
}
