import {Component, Inject, OnInit} from '@angular/core';
import {Post} from "../../../shared/interfaces/post";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PostService} from "../../../shared/services/post.service";

@Component({
  selector: 'app-post-crud-dialog',
  templateUrl: './post-crud-dialog.component.html',
  styleUrls: ['./post-crud-dialog.component.scss']
})
export class PostCrudDialogComponent implements OnInit {
  posts: Post[] = []
  post: Post = {id: 0, title: '', body: ''}

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                title: string,
                func: any
              }, private postService: PostService) {

  }

  ngOnInit(): void {
    this.postService.updateObservable$.subscribe(post => {
      if(post) {
        this.post = post;
      }
    })
  }
}
