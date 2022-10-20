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
  newPost(post: Post): Observable<Post> {
    console.log(`préparation de 'envoi du post: ${JSON.stringify(post)} vers ${apiUrl}/posts`);

    return this.http.post<Post>(`${apiUrl}/posts`, post)

  }
  likePost(postId: string,likeIt:boolean) {
    console.log("likeIt vaut: "+ likeIt);
    let like=""
    likeIt? like="yes":like="no" 
    
    return this.http.post(`${apiUrl}/posts/${postId}/like`, `${like}`, this.httpOptions).pipe(catchError((err) => {
      console.log(err);
      return of(err)
    }))
  }
}