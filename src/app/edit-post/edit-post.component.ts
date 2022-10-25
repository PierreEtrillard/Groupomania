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
  faPaperPlane = faPaperPlane
  image: File | null = null
  newPostForm: FormGroup;

  constructor(private postsService: PostsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      title: ["", Validators.required],
      textContent: [""]
    })
  }
  selectPic(event: any) {
    this.image = event.target.files[0];
    console.log(this.image);
  }
  sendNewPost(){
    const newPost: any = new FormData()
    newPost.append("likers", []);
    newPost.append("title", this.newPostForm.value.title);
    newPost.append("imageUrl", this.image,this.image?.name);
    newPost.append("textContent", this.newPostForm.value.textContent);

    console.log(`préparation de 'envoi du post: ${newPost.title} vers api/posts`);

    return this.postsService.newPost(newPost).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error),
    })
  }
}


