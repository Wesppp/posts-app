import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {User} from "../interfaces/user";
import {GlobalService} from "./global.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = environment.usersHost

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      catchError(this.globalService.handleError<User[]>("get users"))
    )
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`
    return this.http.get<User>(url).pipe(
      catchError(this.globalService.handleError<User>("get user"))
    )
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      catchError(this.globalService.handleError<User>("add user"))
    )
  }

  getAvatar(id: number) {
    return `./assets/avatars/avatar${id}.png`
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
