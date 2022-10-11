import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { catchError, Observable, of, tap } from 'rxjs';
import { Post } from '../models/post.model';
const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${apiUrl}/publications`).pipe(
      tap((res) => console.table(res)),
      catchError((err) => {
        console.log(err);
        return of()
      })
    )
  }
  newPost(post:Post): Observable<Post> {
    console.log(`préparation de 'envoi du post: ${JSON.stringify(post)} vers ${apiUrl}/publications`);
    
    return this.http.post<Post>(`${apiUrl}/publications`,post)
    
  }
}
