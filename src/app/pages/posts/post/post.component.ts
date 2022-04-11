import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../shared/interfaces/post";
import {PostService} from "../../../shared/services/post.service";
import {MatDialog} from "@angular/material/dialog";
import {PostCrudDialogComponent} from "../../../components/modal-dialogs/post-crud-dialog/post-crud-dialog.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() posts: Post[] = []
  @Input() post: Post = {userId: 0, id: 0, title: '', body: ''}
  @Output() deletePosts = new EventEmitter<number>();
  @Output() editPost = new EventEmitter<Post>();

  constructor(private postService: PostService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  deletePost(id: number, $event: any) {
    $event.stopPropagation()
    this.postService.customConfirm().then((result) => {
      if (result.isConfirmed) {
        this.postService.deletePost(id)
          .subscribe(post => {
            if (post) {
              this.postService.openSnackBar("The post was successfully deleted")
              this.deletePosts.emit(id)
            } else {
              this.postService.openSnackBar("Something went wrong")
            }
          }, error => this.postService.openSnackBar(error.message))
      }
    })
  }

  openEditModal(post: Post, $event: any) {
    $event.stopPropagation()
    this.dialog.open(PostCrudDialogComponent, {
      data: {
        title: 'Editing a post',
        func: (title: string, body: string) => {
          this.postService.editPost({title, body, userId: post.userId} as Post, post.id)
            .subscribe(post => {
              if (post) {
                this.postService.openSnackBar("The post was edited")
                this.editPost.emit(post)
              }
            }, error => this.postService.openSnackBar(error.message))
        }
      }
    });
  }
}
