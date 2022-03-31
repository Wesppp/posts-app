import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Post} from "../interfaces/post";
import {Comment} from "../interfaces/comment";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsUrl: string = "http://localhost:3000/posts"
  commentsUrl: string = "https://jsonplaceholder.typicode.com/posts"

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`
    return this.http.get<Post>(url);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, this.httpOptions);
  }

  deletePost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete<Post>(url, this.httpOptions)
  }

  getComments(id: number): Observable<Comment[]> {
    const url = `${this.commentsUrl}/${id}/comments`
    return this.http.get<Comment[]>(url);
  }

  editPost(post: Post, id: number): Observable<any> {
    const url = `${this.commentsUrl}/${id}`
    return this.http.put(url, post, this.httpOptions)
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
