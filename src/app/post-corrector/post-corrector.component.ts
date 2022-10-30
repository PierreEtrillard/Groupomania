import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post.model';
import { UsersService } from '../services/users.service';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from '../services/posts.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-corrector',
  templateUrl: './post-corrector.component.html',
  styleUrls: ['./post-corrector.component.scss']
})
export class PostCorrectorComponent implements OnInit {
  post: Post
  postId:string
  potentialPost:Post|undefined
  allPosts: Post[]
  postUpdateForm:FormGroup
  image: File | null = null
  faFloppyDisk=faFloppyDisk
  constructor(private route:ActivatedRoute,private postsService:PostsService,private formBuilder: FormBuilder,) { }
  ngOnInit(): void {
    this.allPosts = JSON.parse(localStorage['allPosts'])
    this.postId = this.route.snapshot.params['id'];
    this.potentialPost = this.allPosts.find(post=>post.id===this.postId)
    if(this.potentialPost){this.post=this.potentialPost}
    this.postUpdateForm = this.formBuilder.group({
      title:[this.post.title],
      imageUrl :[this.post.imageUrl],
      textContent:[this.post.textContent]
    })
  }
  picSelected(event: any) {
    this.image = event.target.files[0]
  }
  udpatePost() {
    const updatedPost = new FormData()
    if (this.image) {
      updatedPost.append("image", this.image, this.image?.name)
    }
    updatedPost.append("name", this.postUpdateForm.value.title)
    updatedPost.append("email", this.postUpdateForm.value.textContent)
    return this.postsService.updatePost(this.postId,updatedPost).subscribe(console.log
    )

  }
}
