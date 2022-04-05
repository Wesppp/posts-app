import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {User} from "../interfaces/user";
import {GlobalService} from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = 'https://jsonplaceholder.typicode.com/users'

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

  getAvatar(id: number) {
    return `./assets/avatars/avatar${id}.png`
  }
}
