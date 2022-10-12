import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user.model';
import { environment } from '../../environments/environment'
const apiUrl = environment.apiUrl
import { catchError, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  newUser(user: User): Observable<User> {
    return this.http.post<User>(`${apiUrl}/auth/signin`,user)
  }
  updateUser(user: User,id:string): Observable<User> {
    console.log(`Mise à jour de l'utilisateur:  ${JSON.stringify(user)} envoyé à ${apiUrl}/signin/:${id}`);
    return this.http.patch<User>(`${apiUrl}/auth/signin/:${id}`,user).pipe(
      tap(
        (res) => console.log(res)
      ),
      catchError((err) => {
        console.error(err)
        return of()
      }))
  }
  login(logData:any):Observable<any>{
    return this.http.post<any>(`${apiUrl}/auth/login`,logData).pipe(
      tap(
        (res) => console.log(res)
      ),
      catchError((err) => {
        console.error(err)
        return of()
      }))
  }
}
