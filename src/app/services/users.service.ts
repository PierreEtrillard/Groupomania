import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user.model';
import { environment } from '../../environments/environment'
const apiUrl = environment.apiUrl
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isAuth$ = new BehaviorSubject<boolean>(false);
  catchResponse: any
  httpOptions: any = {
    mode: 'cors',
    withCredentials: true,
    credentials: "include"
  }
  constructor(private http: HttpClient, private router: Router) { }

  newUser(user: User) {
    return this.http.post<{ message: string }>(`${apiUrl}/auth/signin`, user)
  }
  login(logData: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/auth/login`, logData, this.httpOptions).pipe(
      tap((res) => {
        this.catchResponse = res
        localStorage['userProfile']=JSON.stringify(this.catchResponse.userProfile)
        this.router.navigate([''])
      }
      ),
      catchError((err) => {
        console.error(err)
        return of(err.error
          // ou: "Désolé, identifiant ou mot de passe incorrecte"
        )
      }))
  }
  logout() {
    return this.http.post(`${apiUrl}/auth/logout`, this.httpOptions).pipe(
      tap(() => {
        this.isAuth$.next(false);
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        localStorage.clear()
        this.router.navigate(['login']);
      }
      ),
      catchError((err) => {
        console.error(err)
        return of()
      }))
  }

  getUserProfile(): Observable<any> {
    return this.http.get<User>(`${apiUrl}/auth/profile/one`, this.httpOptions).pipe(
      catchError((err) => {
        console.error(err)
        return of()
      }))
  }
  getAllProfiles(): Observable<any> {
    return this.http.get<User>(`${apiUrl}/auth/profile/all`, this.httpOptions).pipe(
      catchError((err) => {
        console.error(err)
        return of()
      }))
  }
  updateUser(user: User, id: string): Observable<User> {
    console.log(`Mise à jour de l'utilisateur:  ${JSON.stringify(user)} envoyé à ${apiUrl}/signin/:${id}`);
    return this.http.post<User>(`${apiUrl}/auth/signin/:${id}`, user).pipe(
      tap(
        (res) => console.log(res)
      ),
      catchError((err) => {
        console.error(err)
        return of()
      }))
  }
}
