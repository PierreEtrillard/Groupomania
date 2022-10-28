import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  faPaperPlane = faPaperPlane
  image: File | null = null
  newPostForm: FormGroup;


  constructor(private postsService: PostsService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      title: ["", Validators.required],
      textContent: [""]
    })
  }
  selectPic(event: any) {
    this.image = event.target.files[0];
  }
  sendNewPost() {
    const newPost: any = new FormData()
    if (this.image) {
      newPost.append("image", this.image, this.image?.name);
    }
    newPost.append("title", this.newPostForm.value.title);
    newPost.append("textContent", this.newPostForm.value.textContent);
    return this.postsService.newPost(newPost).subscribe({
      next: (response) => { console.log(response); this.router.navigate([""]) },
      error: (error) => console.error(error),
    })

  }
}


