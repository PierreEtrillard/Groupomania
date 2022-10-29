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
  getOnePost(postId:string): Observable<any> {
    return this.http.get(`${apiUrl}/posts/${postId}`, this.httpOptions)
  }
  newPost(post:FormData) {
    return this.http.post(`${apiUrl}/posts`, post, this.httpOptions)
  }
  likePost(postId: string,likeIt:boolean) {     
    return this.http.post(`${apiUrl}/posts/${postId}/like`, {likeIt:likeIt}, this.httpOptions).pipe(catchError((err) => {
      console.log(err);
      return of(err)
    }))
  }
  deleteOne(postId: string){
    return this.http.delete(`${apiUrl}/posts/${postId}/delete`, this.httpOptions)
  }
  updateOne(postId: string){
    return this.http.put(`${apiUrl}/posts/${postId}/update`, this.httpOptions)
  }
}