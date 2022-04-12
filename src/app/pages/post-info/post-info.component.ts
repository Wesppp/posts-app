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
  post: Post = {userId: 0, id: 0, title: '', body: ''}
  isLoading: boolean = false

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.route.params.subscribe((params: Params) => {
      this.getComments(params['id'])
    }, error => this.globalService.openSnackBar(error.message))

    this.globalService.updateObservable$.subscribe(post => {
      if(post) {
        this.post = post;
      }
    })
  }

  getComments(id: number) {
    this.postService.getComments(id)
      .subscribe(comments => {
        if (comments.length) {
          this.comments = comments
          this.isLoading = false
        }
      }, error => this.globalService.openSnackBar(error.message))
  }
}
