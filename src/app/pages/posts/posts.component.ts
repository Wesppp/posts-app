import {Component, OnInit} from '@angular/core';
import {PostService} from "../../shared/services/post.service";
import {Post} from "../../shared/interfaces/post";
import {MatDialog} from "@angular/material/dialog";
import {AddPostDialogComponent} from "../../components/modal-dialogs/add-post-dialog/add-post-dialog.component";
import {GlobalService} from "../../shared/services/global.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  search: string = ''
  posts: Post[] = []
  post: Post = {id: 0, title: '', body: ''}
  isLoading: boolean = false

  constructor(private postService: PostService,
              private dialog: MatDialog,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getPosts()

    this.globalService.updateObservable$.subscribe(res => {
      if(res.refresh) {
        this.getPosts();
      }
    }, error => this.globalService.openSnackBar(error.message))
  }

  openDialog() {
    this.dialog.open(AddPostDialogComponent);
  }

  getPosts() {
    this.isLoading = true
    this.postService.getPosts()
      .subscribe(posts => {
        if (posts) {
          this.posts = posts
          this.isLoading = false
        } else {
          this.globalService.openSnackBar('something went wrong')
        }
      }, error => this.globalService.openSnackBar(error.message))
  }
}
