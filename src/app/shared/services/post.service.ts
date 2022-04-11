import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {Post} from "../interfaces/post";
import {Comment} from "../interfaces/comment";
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsUrl = environment.postsHost
  commentsUrl = environment.commentsHost

  update = new BehaviorSubject<any>('');
  updateObservable$ = this.update.asObservable();

  updateComponent(data: any) {
    if (data) {
      this.update.next(data);
    }
  }

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl).pipe(
      catchError(this.handleError<Post[]>("get posts"))
    )
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`
    return this.http.get<Post>(url).pipe(
      catchError(this.handleError<Post>("get post"))
    )
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, this.httpOptions).pipe(
      catchError(this.handleError<Post>("add post"))
    )
  }

  deletePost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete<Post>(url, this.httpOptions).pipe(
      catchError(this.handleError<Post>("delete posts"))
    )
  }

  getComments(id: number): Observable<Comment[]> {
    const url = `${this.commentsUrl}/${id}/comments`
    return this.http.get<Comment[]>(url).pipe(
      catchError(this.handleError<Comment[]>("get comments"))
    )
  }

  editPost(post: Post, id: number): Observable<any> {
    const url = `${this.postsUrl}/${id}`
    return this.http.put(url, post, this.httpOptions);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)

      console.log(`${operation} failed: ${error.message}`)

      return of(result as T);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(`${message}`, '', {
      duration: 2000
    })
  }

  customConfirm() {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
  }
}
