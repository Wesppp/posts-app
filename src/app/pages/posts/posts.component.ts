import {Component, OnInit} from '@angular/core';
import {PostService} from "../../shared/services/post.service";
import {Post} from "../../shared/interfaces/post";
import {MatDialog} from "@angular/material/dialog";
import {GlobalService} from "../../shared/services/global.service";
import {PostCrudDialogComponent} from "../../components/modal-dialogs/post-crud-dialog/post-crud-dialog.component";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  search: string = ''
  posts: Post[] = []
  post: Post = {userId: 0, id: 0, title: '', body: ''}
  isLoading: boolean = false

  constructor(private postService: PostService,
              private dialog: MatDialog,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getPosts()
  }

  openDialog() {
    this.dialog.open(PostCrudDialogComponent, {
      data: {
        title: 'Adding a new post',
        func: (title: string, body: string) => {
          let userId = Math.floor(Math.random() * (10 - 1)) + 1
          this.postService.addPost({title, body, userId} as Post)
            .subscribe(post => {
              if (post) {
                this.globalService.openSnackBar("Post was added!")
                post.id = this.posts.length+1
                this.posts.push(post)
              }
            }, error => this.globalService.openSnackBar(error.message))
        }
      }
    });
  }

  getPosts() {
    this.isLoading = true
    this.postService.getPosts()
      .subscribe(posts => {
        if (posts) {
          this.posts = posts.slice(0, 5)
          this.isLoading = false
        } else {
          this.globalService.openSnackBar('something went wrong')
        }
      }, error => this.globalService.openSnackBar(error.message))
  }

  deletePost(id: number) {
    this.posts = this.posts.filter(post => post.id !== id)
  }

  editPost(editedPost: Post) {
    this.posts = this.posts.map(post => editedPost.id === post.id? editedPost: post)
  }
}
