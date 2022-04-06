import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable} from "rxjs";
import {Post} from "../interfaces/post";
import {Comment} from "../interfaces/comment";
import {GlobalService} from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsUrl: string = "http://localhost:3000/posts"
  commentsUrl: string = "https://jsonplaceholder.typicode.com/posts"

  constructor(private http: HttpClient,
              private globalService: GlobalService) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl).pipe(
      catchError(this.globalService.handleError<Post[]>("get posts"))
    )
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`
    return this.http.get<Post>(url).pipe(
      catchError(this.globalService.handleError<Post>("get post"))
    )
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, this.httpOptions).pipe(
      catchError(this.globalService.handleError<Post>("add post"))
    )
  }

  deletePost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete<Post>(url, this.httpOptions).pipe(
      catchError(this.globalService.handleError<Post>("delete posts"))
    )
  }

  getComments(id: number): Observable<Comment[]> {
    const url = `${this.commentsUrl}/${id}/comments`
    return this.http.get<Comment[]>(url).pipe(
      catchError(this.globalService.handleError<Comment[]>("get comments"))
    )
  }

  editPost(post: Post, id: number): Observable<any> {
    const url = `${this.commentsUrl}/${id}`
    return this.http.put(url, post, this.httpOptions);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
