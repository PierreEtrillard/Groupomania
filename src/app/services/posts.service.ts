import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Post } from '../models/post.model';
import { UsersService } from './users.service';
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  allPosts$ = new Subject<Post[]>;
  constructor(
    private http: HttpClient, private usersService: UsersService
  ) { }
  httpOptions:any = {
    mode:'cors',
    withCredentials:true,
    credentials: "include"
  }
  getAllPosts(): Observable<any> {
        return this.http.get(`${apiUrl}/posts`,this.httpOptions).pipe(catchError((err) => {
        console.log(err);
        return of()
      })
    )
  }
  newPost(post: Post): Observable<Post> {
    console.log(`préparation de 'envoi du post: ${JSON.stringify(post)} vers ${apiUrl}/posts`);

    return this.http.post<Post>(`${apiUrl}/posts`, post)

  }
};