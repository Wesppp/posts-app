import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../shared/services/global.service";
import { Comment } from "../../shared/interfaces/comment";
import {Post} from "../../shared/interfaces/post";
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../shared/services/post.service";

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {
  comments: Comment[] = []
  post: Post = {id: 0, title: '', body: ''}
  isLoading: boolean = false

  constructor(private globalService: GlobalService,
              private route: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.route.params.subscribe((params: Params) => {
      this.getPost(params['id'])
      this.getComments(params['id'])
      this.isLoading = false
    }, error => this.globalService.openSnackBar(error.message))
  }

  getPost(id: number) {
    this.postService.getPost(id)
      .subscribe(post => {
        if (post) {
          this.post = post
        }
      }, error => this.globalService.openSnackBar(error.message))
  }

  getComments(id: number) {
    this.postService.getComments(id)
      .subscribe(comments => {
        if (comments.length) {
          this.comments = comments
        }
      }, error => this.globalService.openSnackBar(error.message))
  }
}
