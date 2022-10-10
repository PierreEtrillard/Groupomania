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
    private http:HttpClient
  ) { }
  getAllPosts():Observable<Post[]|unknown>{
    return this.http.get<Post[]>(`${apiUrl}/publications`).pipe(
              tap((res) => console.table(res)),
              catchError((err) => {
                  console.log(err);
                  return of()
              })
          );
    // this.characterService.getCharactersList(this.page).subscribe((data:Character[])=>this.disneyList=data);
  }
}
