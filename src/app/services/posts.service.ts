import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Post } from '../models/post.model';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  allPosts$ = new Subject<Post[]>;
  postTargeted: Post
  constructor(
    private http: HttpClient, private router: Router
  ) { }
  httpOptions: any = {
    mode: 'cors',
    withCredentials: true,
    credentials: "include"
  }
  getAllPosts(): Observable<any> {
    return this.http.get(`${apiUrl}/posts`, this.httpOptions).pipe(catchError((err) => {
      console.log(err);
      return of(this.router.navigate(['/login']))
    })
    )
  }
  newPost(post:FormData) {
    console.log(`préparation de 'envoi du post ${post} vers ${apiUrl}/posts`);

    return this.http.post(`${apiUrl}/posts`, post, this.httpOptions)

  }
  likePost(postId: string,likeIt:boolean) {     
    return this.http.post(`${apiUrl}/posts/${postId}/like`, {likeIt:likeIt}, this.httpOptions).pipe(catchError((err) => {
      console.log(err);
      return of(err)
    }))
  }
}