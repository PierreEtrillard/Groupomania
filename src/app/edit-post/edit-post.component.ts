import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  faPaperPlane=faPaperPlane
  newPost: Post

  public newPostForm: FormGroup;

  constructor(private postsService: PostsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      title: ["", Validators.required],
      imageUrl: ["", ],
      textContent: ["", ],
    })
  }
  sendNewPost() {
    this.newPost = {
      likers:[],
      id:"",
      title: this.newPostForm.value.title,
      textContent: this.newPostForm.value.textContent,
      imageUrl: this.newPostForm.value.imageUrl,
    };
    console.log(`préparation de 'envoi du post: ${JSON.stringify(this.newPost)} vers api/posts`);

    return this.postsService.newPost(this.newPost).subscribe()
  }
}


